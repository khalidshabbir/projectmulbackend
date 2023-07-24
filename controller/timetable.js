const  Timetable=require("../models/timetable")
exports.registertimetable =async (req, res) => {
    try {
        console.log(req.body)
      const { subjectname,day,classs ,teacher,lecture,room } = req.body;
      const existingTimetable = await Timetable.findOne({ day, lecture, room });
      const existingTimetables = await Timetable.findOne({ subjectname, classs, teacher,day,lecture });
      const existingTimetablesteacher = await Timetable.findOne({ teacher,day,lecture });
     if (existingTimetable) {
      return res.status(400).json({ message: 'Room is already assigned' });
     }
      if(existingTimetables){
      return res.status(400).json({ message: 'Class has already Lecture' });
     }
      if(existingTimetablesteacher){
      return res.status(400).json({ message: 'Teacher has already Lecture' });
     }
  
      const timetable = new Timetable({ subjectname,day,classs ,teacher,lecture,room });
      await timetable.save();
  
      return  res.status(201).json({message:"Timetable Created Successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
  
  // =====================================================
  exports.getTimetable=async(req,res)=>{
    try {
      // Fetch all classrooms from the database
      const timetable = await Timetable.find();
  
      res.status(200).json(timetable);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
  
  
  // =========================================================
  exports.deleteTimetable=async(req,res)=>{
    try {
      const { id } = req.params;
      console.log(id)
  
      // Delete the classroom by ID
      const deleted = await Timetable.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    } 
  }
  // =========================================================
  exports.updateTimetable=async(req,res)=>{
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

  // =================================get students timetable================
  exports.getTimetableStudent = async(req, res) => {
    console.log("hellow")
    const {day,classs} = req.params;
   
     console.log(classs,day)
    if (!classs || !day) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    const result = await Timetable.find({ classs, day })
    if(result){
      return res.status(200).json(result);
    }else{
      return res.status(400).json({message:"Record Not Found"})
    }

   
  }
  exports.getTimetableStudenttimetable = async(req, res) => {
   
    const {classs} = req.params;
   
     console.log(classs)
    if (!classs) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    const result = await Timetable.find({ classs })
    if(result){
      return res.status(200).json(result);
    }else{
      return res.status(400).json({message:"Record Not Found"})
    }

   
  }
  exports.getTimetableTeachertimetable = async(req, res) => {
    const {teacher} = req.params;
     console.log(teacher)
    if (!teacher) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    const result = await Timetable.find({teacher })
    if(result){
      return res.status(200).json(result);
    }else{
      return res.status(400).json({message:"Record Not Found"})
    }

   
  }
  exports.getTimetableTeacher = async(req, res) => {
  
    const {day,teacher} = req.params;
   
    if (!teacher || !day) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    const result = await Timetable.find({ teacher, day })
    if(result){
      return res.status(200).json(result);
    }else{
      return res.status(400).json({message:"Record Not Found"})
    }

   
  }