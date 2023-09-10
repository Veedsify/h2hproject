const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);
const { dbQuery } = require("../mysql/mysql")
const jwt = require('jsonwebtoken');
const { validateUser } = require("./middleware");
const iquotes = require('iquotes');
const { welcomeMail } = require("../mailer/welcome");

// INITIATE PAYMENTS
router.post("/initiate-payment", async (req, res) => {
  const { email, first_name, last_name, phone } = req.body;

  try {

    const [checkForUser] = await dbQuery("SELECT * FROM h2h_users WHERE email = ? LIMIT 1", [email])

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
      return res.json(response.data);
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
        const createUser = await dbQuery(`
          INSERT INTO h2h_users (first_name, last_name, email, user_id, progress, paid_status) VALUES (?,?,?,?,?,?)
        `, [firstname, lastname, customer.email, `${customer.customer_code}${crypto.randomBytes(3).toString("hex")}`, "0", "paid"])

        if (createUser) {
          // CREATE A SESSION OF THE NEW USER

          const userEmail = customer.email

          await welcomeMail(userEmail)

          const [user] = await dbQuery("SELECT * FROM h2h_users WHERE email = ? LIMIT 1", [userEmail])

          const accessToken = jwt.sign(
            { user },
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
  const { user_id } = req.user.user
  const { progress, current } = req.body

  const [thisUser] = await dbQuery("SELECT * FROM h2h_users WHERE user_id = ? LIMIT 1", [user_id])


  let updateProgress;

  if (Number(thisUser.progress) < progress) {
    updateProgress = await dbQuery("UPDATE h2h_users SET progress = ? AND current_page = ? WHERE user_id = ?", [progress, current, user_id])
  }

  if (updateProgress) {
    res.status(200);
  }
});


// USER
router.get("/:user_id", validateUser, async (req, res) => {
  const { user_id } = req.user.user

  const [getCourse] = await (dbQuery(`SELECT * FROM h2h_course ORDER BY h2h_id ASC LIMIT 1`))

  const [thisUser] = await dbQuery(`SELECT * FROM h2h_users WHERE user_id = ?`, [user_id])

  const { quote, author } = iquotes.random();

  res.render("user/user", { thisUser, getCourse, quote, author });
});

module.exports = router;
