var express = require('express');
var router = express.Router();
let aboutRoute = require("./about")
let contactRoute = require("./contact")
let userRoute = require("./user")
let courseRoute = require("./course")
let loginRoute = require("./login");
const { sendContactMail } = require('../mailer/message');

// USE ROUTERS
router.use('/about', aboutRoute)
router.use('/contact', contactRoute)
router.use('/user', userRoute)
router.use('/course', courseRoute)
router.use('/login', loginRoute)


//REVIEW PAGE
router.get('/review/:id', (req, res, next) => {
  res.render("reviews")
})


// THANKYOU PAGE
router.get('/thank-you/', (req, res, next) => {
  res.render("user/thankyou")
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



// MESSAGE 
router.post('/message/new', async (req, res, next) => {
  const { first_name,
    last_name,
    email,
    subject,
    message } = req.body

  try {

    const sendMail = await sendContactMail(first_name,
      last_name,
      email,
      subject,
      message)

    if (sendMail) {
      res.status(200).json({ send: "success" })
    } else {
      res.status(500)
    }

  } catch (err) {
    console.log(err)
    res.status(500)
  }

})


// SEND A REVIEW

module.exports = router;
