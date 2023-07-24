const express = require('express');
const router = express.Router();
const {
    registerClassRooms,getClassRooms,deleteClassRooms, updateClassRooms,
    registerTeachers,getTeacherss,deleteTeachers,updateTeacher,
    registerClasses,getClasses,deleteClassess,updateClasses,
    registerLectures,getLectures,deleteLectures,updateLectures

}=require('../controller/dropdowns')
// ======================================================
router.post('/register_classrooms', registerClassRooms)
router.get('/get_classrooms', getClassRooms)
router.delete('/delete_classrooms/:id', deleteClassRooms)
router.put('/update_classrooms/:id', updateClassRooms)
// ========================================================
router.post('/register_teacher',registerTeachers)
router.get('/get_teachers', getTeacherss)
router.delete('/delete_teachers/:id', deleteTeachers)
router.put('/update_teachers/:id', updateTeacher)
// =========================================================
router.post('/register_classes',registerClasses)
router.get('/get_classes', getClasses)
router.delete('/delete_classes/:id', deleteClassess)
router.put('/update_classes/:id', updateClasses)
// ====================================================
router.post('/register_lecture',registerLectures)
router.get('/get_lecture', getLectures)
router.delete('/delete_lecture/:id', deleteLectures)
router.put('/update_lecture/:id', updateLectures)


module.exports = router;