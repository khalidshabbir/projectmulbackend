const express = require('express');
const router = express.Router();
const {registertimetable,getTimetable,deleteTimetable,getTimetableStudent,getTimetableTeacher,getTimetableStudenttimetable,getTimetableTeachertimetable}=require("../controller/timetable")
// ======================================================
router.post('/register_timetable', registertimetable)
router.get('/get_timetable', getTimetable)
router.get('/get_timetable_students/:day/:classs', getTimetableStudent)
router.get('/get_timetable_studentstimetable/:classs', getTimetableStudenttimetable)
router.get('/get_timetable_teachertimetable/:teacher', getTimetableTeachertimetable)
router.get('/get_timetable_teacher/:day/:teacher', getTimetableTeacher)
router.delete('/delete_timetable/:id', deleteTimetable)

module.exports = router;