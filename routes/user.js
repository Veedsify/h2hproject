const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);
const queryDb = require("../libs/prisma")
const jwt = require('jsonwebtoken');
const { validateUser } = require("./middleware");
const iquotes = require('iquotes');
const { welcomeMail } = require("../mailer/welcome");

// INITIATE PAYMENTS
router.post("/initiate-payment", async (req, res) => {
  const { email, first_name, last_name, phone } = req.body;

  try {

    const checkForUser = await queryDb.h2h_users.findFirst({
      where: {
        email: email
      }
    })

    if (checkForUser && Object.keys(checkForUser).length > 0) {
      return res.json({ message: "Sorry user already exist, Please Login" })
    }

    const response = await paystack.transaction.initialize({
      email,
      metadata: {
        first_name,
        last_name,
        phone,
      },
      amount: process.env.AMOUNT * 100, // Amount in kobo
      reference: crypto.randomBytes(11).toString("hex"), // Generate a unique reference
    });

    if (response) {
      console.log(response);
      res.json(response.data);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while initiating payment." });
  }
});

// Payment callback route (Paystack will redirect to this URL after payment)
router.get("/verify-payment", (req, res) => {
  const reference = req.query.reference;

  paystack.transaction
    .verify(reference)
    .then(async (response) => {
      // Payment was successful
      if (response.data.status === "success") {
        const { paid_at, amount, reference, customer, metadata } = response.data;
        const { first_name: firstname, last_name: lastname } = metadata

        // CREATE USER
        const createUser = await queryDb.h2h_users.create({
          data: {
            first_name: firstname,
            last_name: lastname,
            email: customer.email,
            user_id: customer.customer_code,
            progress: "0",
            paid_status: "paid",
          }
        })

        if (createUser) {
          // CREATE A SESSION OF THE NEW USER

          const userEmail = customer.email

          await welcomeMail(userEmail)

          const thisUser = await queryDb.h2h_users.findFirst({
            where: {
              email: userEmail
            }
          })

          const accessToken = jwt.sign(
            thisUser,
            process.env.JSON_TOKEN_SECRET
          )

          res.cookie('access-token', accessToken, {
            httpOnly: false, // Prevents JavaScript access
            secure: false,   // Requires HTTPS connection
            maxAge: 3600000, // Token expiration time in milliseconds (e.g., 1 hour)
          }).redirect(`/user/${customer.customer_code}`)
        }

      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while verifying payment." });
    });
});


// UPDATE PROGRESS
router.post("/update-progress", validateUser, async (req, res) => {
  const { user } = req
  const { progress, current } = req.body

  const thisUser = await queryDb.h2h_users.findFirst({
    where: {
      user_id: user.user_id,
    },
  })

  let updateProgress;

  if (Number(thisUser.progress) < progress) {
    updateProgress = await queryDb.h2h_users.update({
      where: {
        user_id: user.user_id
      },
      data: {
        progress,
        current_page: current
      }
    })
  }

  if (updateProgress) {
    res.status(200);
  }
});


// USER
router.get("/:user_id", validateUser, async (req, res) => {
  const { user_id } = req.user

  const getCourse = await queryDb.h2h_course.findFirst({
    orderBy: {
      h2h_id: "asc"
    }
  })

  const thisUser = await queryDb.h2h_users.findFirst({
    where: {
      user_id: user_id,
    },
  })

  const { quote, author } = iquotes.random();

  res.render("user/user", { thisUser, getCourse, quote, author });
});

module.exports = router;
