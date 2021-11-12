const router = require('express').Router();
const Student = require('../db/models/Student');
// path: /students

router.get('/', async (req, res) => {
  try {
    const students = await Student.find({});
    res.send({students})
  } catch (err) {
    console.log(err);
    res.status(500).send('Ooops algo salió mal');
  }
});

router.get('/short', async (req, res) => {
  try {
    const students = await Student.find({});
    res.send({students: students.slice(0, 2)});
  } catch (err) {
    console.log(err);
    res.status(500).send('Ooops algo salió mal');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const student = await Student.findOne({_id: id});
    if (student) {
      return res.send({student});
    }
    res.status(404).send('Estudiante no encontrado');
  } catch (err) {
    console.log(err);
    res.status(500).send('Ooops algo salió mal');
  }
});

router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send({student});
  } catch (err) {
    console.log(err);
    res.status(500).send('Ooops algo salió mal');
  }
})

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const student = await Student.findOneAndUpdate({_id: id}, req.body);
    if (student) {
      return res.send({student});
    }
    res.status(404).send('Student not found')
  } catch (err) {
    console.log(err);
    res.status(500).send('Ooops algo salió mal');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const student = await Student.findOneAndDelete({_id: id});
    if (student) {
      return res.send({student});
    }
    res.status(404).send('Student not found')
  } catch (err) {
    console.log(err);
    res.status(500).send('Ooops algo salió mal');
  }
});

module.exports = router;