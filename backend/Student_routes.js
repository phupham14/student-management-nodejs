const express = require('express');
const router = express.Router();
const Student = require('.\\Student_models.js');

// Lấy danh sách sinh viên
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm sinh viên
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    major: req.body.major
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật sinh viên
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa sinh viên
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted student' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
