
const ClassRoom = require('../models/classrooms');
const Teacher =require("../models/techers")
const Class=require("../models/classes")
const Lectues=require("../models/lectures")
// ============================================================
exports.registerClassRooms =async (req, res) => {
  try {
    const { name } = req.body;

    // Check if classroom name already exists
    const existingClassroom = await ClassRoom.findOne({ name });
    if (existingClassroom) {
      return res.status(400).json({ error: 'Classroom name already exists' });
    }

    // Create a new classroom
    const classroom = new ClassRoom({ name });
    await classroom.save();

    res.status(201).json(classroom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// =====================================================
exports.getClassRooms=async(req,res)=>{
  try {
    // Fetch all classrooms from the database
    const classrooms = await ClassRoom.find();

    res.status(200).json(classrooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


// =========================================================
exports.deleteClassRooms=async(req,res)=>{
  try {
    const { id } = req.params;
    console.log(id)

    // Delete the classroom by ID
    const deletedClassroom = await ClassRoom.findByIdAndDelete(id);

    if (!deletedClassroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.status(200).json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } 
}
// =========================================================
exports.updateClassRooms=async(req,res)=>{
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Check if classroom exists
    const classroom = await ClassRoom.findById(id);
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    // Update the classroom name
    classroom.name = name;
    await classroom.save();

    res.status(200).json(classroom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// ======================================================================
// ======================================================================
// =======================================================================
exports.registerTeachers =async (req, res) => {
  try {
    const { name } = req.body;

    // Check if classroom name already exists
    const existingTeacher = await Teacher.findOne({ name });
    if (existingTeacher) {
      return res.status(400).json({ error: 'Teacher already exists' });
    }

    // Create a new classroom
    const teacher = new Teacher({ name });
    await teacher.save();

    res.status(201).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
// =====================================================
exports.getTeacherss=async(req,res)=>{
  try {
    // Fetch all classrooms from the database
    const teachers = await Teacher.find();

    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
// =========================================================
exports.deleteTeachers=async(req,res)=>{
  try {
    const { id } = req.params;
    console.log(id)

    // Delete the classroom by ID
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } 
}
// =========================================================
exports.updateTeacher=async(req,res)=>{
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Check if classroom exists
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Update the classroom name
    teacher.name = name;
    await teacher.save();

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


// ======================================================================
// ======================================================================
// =======================================================================
exports.registerClasses =async (req, res) => {
  try {
    console.log("Here")
    const { name } = req.body;

    // Check if classroom name already exists
    const existingClass = await Class.findOne({ name });
    if (existingClass) {
      return res.status(400).json({ error: 'Class already exists' });
    }

    // Create a new classroom
    const classes = new Class({ name });
    await classes.save();

    res.status(201).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
// =====================================================
exports.getClasses=async(req,res)=>{
  try {
    // Fetch all classrooms from the database
    const classess = await Class.find();

    res.status(200).json(classess);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
// =========================================================
exports.deleteClassess=async(req,res)=>{
  try {
    const { id } = req.params;
    console.log(id)

    // Delete the classroom by ID
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } 
}
// =========================================================
exports.updateClasses=async(req,res)=>{
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Check if classroom exists
    const classes = await Class.findById(id);
    if (!classes) {
      return res.status(404).json({ error: 'Class not found' });
    }

    // Update the classroom name
    classes.name = name;
    await classes.save();

    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
// ======================================================================
// ======================================================================
// =======================================================================

exports.registerLectures =async (req, res) => {
  try {
    
    const { name } = req.body;

    // Check if classroom name already exists
    const existingLecture = await Lectues.findOne({ name });
    if (existingLecture) {
      return res.status(400).json({ error: 'Lecture already exists' });
    }

    // Create a new classroom
    const lecturess = new Lectues({ name });
    await lecturess.save();

    res.status(201).json(lecturess);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
// =====================================================
exports.getLectures=async(req,res)=>{
  try {
    // Fetch all classrooms from the database
    const lectures = await Lectues.find();

    res.status(200).json(lectures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
// =========================================================
exports.deleteLectures=async(req,res)=>{
  try {
    const { id } = req.params;
    

    // Delete the classroom by ID
    const deletedLecture = await Lectues.findByIdAndDelete(id);

    if (!deletedLecture) {
      return res.status(404).json({ error: 'Lecture not found' });
    }

    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } 
}
// =========================================================
exports.updateLectures=async(req,res)=>{
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Check if classroom exists
    const lectures = await Lectues.findById(id);
    if (!lectures) {
      return res.status(404).json({ error: 'Lecture not found' });
    }

    // Update the classroom name
    lectures.name = name;
    await lectures.save();

    res.status(200).json(lectures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

