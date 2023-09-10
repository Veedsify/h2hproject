var express = require('express');
var router = express.Router();
const { validateUser } = require("./middleware")
const { dbQuery } = require('../mysql/mysql')

/* GET users listing. */
router.use(validateUser)

router.get('/:id', async function (req, res, next) {

  const { id } = req.params

  const [getCourse] = await dbQuery("SELECT * FROM h2h_course WHERE h2h_string_id = ? LIMIT 1", [id])

  const [{ count }] = await dbQuery("SELECT COUNT(*) AS count FROM h2h_course")

  const [previousRecord] = await dbQuery(`SELECT * FROM h2h_course
                                          WHERE h2h_code < ?
                                          ORDER BY h2h_code DESC
                                          LIMIT 1;`, [getCourse.h2h_code])

  const [nextRecord] = await dbQuery(`SELECT * FROM h2h_course
                                          WHERE h2h_code > ?
                                          ORDER BY h2h_code ASC
                                          LIMIT 1;`, [getCourse.h2h_code])

  if (getCourse) {
    return res.render('user/course', { getCourse, nextRecord, previousRecord, count: count });
  } else {
    return res.redirect("/user/1")
  }

});

module.exports = router;
