const router = require('express').Router();
const Student = require('../db/models/Student');
// path: /students

router.get('/', (req, res) => {
  Student.find({})
    .then(students => {
      res.send({students});
    })
});

router.get('/short', (req, res) => {
  Student.find({})
  .then(students => {
    res.send({students: students.slice(0, 2)});
  });
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Student.findOne({_id: id})
    .then(student => {
      if (student) {
        return res.send({student})
      }
      res.status(404).send('Student not found');
    })
});

router.post('/', (req, res) => {
  const student = new Student(req.body);
  student.save()
    .then(student => {
      res.send({student});
    })
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  Student.findOneAndUpdate({_id: id}, req.body)
    .then(student => {
      if (student) {
        return res.send({student});
      }
      res.status(404).send('Student not found')
    })
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Student.findOneAndDelete({_id: id})
    .then(student => {
      if (student) {
        return res.send({student});
      }
      res.status(404).send('Student not found')
    })
});

module.exports = router;