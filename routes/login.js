var express = require('express');
const { dbQuery } = require('../mysql/mysql')
var router = express.Router();
const { sendLoginMail } = require("../mailer/login")
const jwt = require("jsonwebtoken")
const { JSON_TOKEN_2, JSON_TOKEN_SECRET } = process.env

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.cookies["access-token"]) {
    return res.redirect('/user/1')
  }
  res.render('login');
});


router.post('/new', async (req, res) => {
  const { email } = req.body

  const [findUser] = await dbQuery("SELECT * FROM h2h_users WHERE email = ? LIMIT 1", [email])

  if (findUser && Object.keys(findUser).length > 0) {

    const validationToken = jwt.sign({ email }, JSON_TOKEN_SECRET, {
      expiresIn: '1h' // Use '3h' for 3 hours
    });

    const uniqueLink = `${req.protocol}://${req.get("host")}/login/verify/${validationToken}`;

    const sendMail = await sendLoginMail(email, uniqueLink)

    if (sendMail) {
      return res.json({ message: "A unique login link has been sent to your inbox" })
    }

  } else {
    return res.json({ message: "User is not a member of the H2Hproject" })
  }
})

router.get('/verify/:token', async (req, res, next) => {
  try {
    const { token } = req.params

    const { email } = jwt.verify(token, JSON_TOKEN_SECRET);

    const [user] = await dbQuery("SELECT * FROM h2h_users WHERE email = ? LIMIT 1", [email])

    if (user && user.email) {

      const accesstoken = jwt.sign({ user }, JSON_TOKEN_SECRET, {
        expiresIn: '3h' // Use '3h' for 3 hours
      });

      res.cookie('access-token', accesstoken, {
        httpOnly: false, // Prevents JavaScript access
        secure: false,   // Requires HTTPS connection
        maxAge: 3600000, // Token expiration time in milliseconds (e.g., 1 hour)
      }).redirect(`/user/1`)

    } else {
      res.redirect('/login')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/login')
  }
})

router.get('/out', (req, res, next) => {
  res.cookie('access-token', '', { expires: new Date(0) }).redirect("/login")
})

module.exports = router;
