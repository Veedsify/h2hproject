var express = require('express');
var router = express.Router();
const { validateUser } = require("./middleware")
const queryDb = require('../libs/prisma')

/* GET users listing. */
router.use(validateUser)

router.get('/:id', async function (req, res, next) {

  const { id } = req.params

  const getCourse = await queryDb.h2h_course.findFirst({
    where: {
      h2h_string_id: id
    }
  })


  const count = await queryDb.h2h_course.count()

  const previousRecord = await queryDb.h2h_course.findFirst({
    where: {
      h2h_code: { lt: Number(getCourse.h2h_code) },
    },
    orderBy: {
      h2h_code: 'desc', // Change this based on your sorting criteria
    },
  });

  const nextRecord = await queryDb.h2h_course.findFirst({
    where: {
      h2h_code: { gt: Number(getCourse.h2h_code) },
    },
    orderBy: {
      h2h_code: 'asc', // Change this based on your sorting criteria
    },
  });

  if (getCourse) {
    return res.render('user/course', { getCourse, nextRecord, previousRecord, count });
  } else {
    return res.redirect("/user/1")
  }

});

module.exports = router;
