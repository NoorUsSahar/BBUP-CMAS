const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/adminEtc/auth');
const { check, validationResult } = require('express-validator');
const Enrollment = require('../../../models/adminEtc/Enrollment');
const User = require('../../../models/adminEtc/User');
// const Applicant = require('../../models/Applicant');
const Course = require('../../../models/adminEtc/Course');

// @route  GET /api/enrollements
// @desc   Get all enrollment semester
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.find().populate('semesters.program', [
      'name'
    ]);
    const semesters = enrollment[0].semesters;

    res.json(semesters);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/enrollements/current
// @desc   Get current enrollment semester
// @access Private
router.get('/current/:id', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.find().populate('semesters', [
      'courseList.courseId.name',
      'courseList.courseId.creditHours',
      'courseList.courseId.compulsory',
      'courseList.courseId.prerequisite',
      'courseList.courseId.minimumAttendanceRequiredForTerminals',
      'sectionList.sectionId.name',
      'sectionList.sectionId.maximumStrength',
      'sectionList.sectionId.currentNumberOfStudents'
    ]);

    const semesters = enrollement[0].semesters[0];

    res.json(semesters);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/enrollements/:id
// @desc   Get current enrollment semester by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.find().populate('semesters', [
      'courseList.courseId.name',
      'courseList.courseId.creditHours',
      'courseList.courseId.compulsory',
      'courseList.courseId.prerequisite',
      'courseList.courseId.minimumAttendanceRequiredForTerminals',
      'sectionList.sectionId.name',
      'sectionList.sectionId.maximumStrength',
      'sectionList.sectionId.currentNumberOfStudents'
    ]);
    const semester = enrollment[0].semesters.filter(
      semester => semester._id.toString() === req.params.id
    )[0];

    res.json(semester);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/enrollements/generate-course-list/:id
// @desc   Create course list for semester
// @access Private
router.put('/generate-course-list/:id', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.find();
    const semester = enrollment[0].semesters.filter(
      semester => semester._id.toString() === req.params.id
    )[0];

    const courses = await Course.find();

    if (semester.courseList.length === 0) {
      courses.forEach(course => {
        semester.courseList.push({ courseId: course._id });
      });
    }

    await enrollment[0].save();

    res.json({ msg: 'Course list has been generated sucessfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/enrollements/generate-section-list/:id
// @desc   Create section list for semester
// @access Private
router.put('/generate-section-list/:id', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.find();
    const semester = enrollment[0].semesters.filter(
      semester => semester._id.toString() === req.params.id
    )[0];
    const sections = await Section.find();

    if (semester.sectionList.length === 0) {
      sections.forEach(section => {
        semester.sectionList.push({ sectionId: section._id });
      });
    }

    await enrollment[0].save();

    res.json({ msg: 'Section list has been generated successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  POST /api/enrollments
// @desc   Create a new enrollment semester
// @access Private
router.post(
  '/',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('maximumBatchStrength', 'Maximum batch strength is required').isInt(),
    check('startDate', 'Start date is required')
      .not()
      .isEmpty(),
    check('endDate', 'End date is required')
      .not()
      .isEmpty(),
    check('program', 'Program is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      maximumBatchStrength,
      startDate,
      endDate,
      program
    } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 1) {
        return res.status(400).json({ msg: 'User not authorized' });
      }

      let enrollment = await Enrollment.find();

      if (enrollment.length === 0) {
        enrollment = new Enrollment();
      } else {
        enrollment = enrollment[0];
      }

      const newSemester = {
        name,
        description,
        maximumBatchStrength,
        startDate,
        endDate,
        program
      };

      if (
        enrollment.semesters
          .map(semester => semester.name)
          .indexOf(newSemester.name) !== -1
      ) {
        return res.status(400).json({ msg: 'Semester already exists' });
      }

      enrollment.semesters.push(newSemester);

      await enrollment.save();
      res.json(enrollment);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/enrollments/enable-enrollment-semester/:id
// @desc   Enable enrollment semester by id
// @access Private
router.put('/enable-enrollment-semester/:id', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.find();
    const semester = enrollment[0].semesters.filter(
      semester => semester._id.toString() === req.params.id
    )[0];

    semester.status = true;

    await enrollment[0].save();

    res.json(enrollment);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/enrollments/disable-enrollment-semester/:id
// @desc   Disable enrollment semester by id
// @access Private
router.put('/disable-enrollment-semester/:id', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.find();
    const semester = enrollment[0].semesters.filter(
      semester => semester._id.toString() === req.params.id
    )[0];

    semester.status = false;

    await enrollment[0].save();

    res.json(enrollment);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/enrollments/:id
// @desc   Update enrollments semester by id
// @access Private
router.put(
  '/:id',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('maximumBatchStrength', 'Maximum batch strength is required').isInt(),
    check('startDate', 'Start date is required')
      .not()
      .isEmpty(),
    check('endDate', 'End date is required')
      .not()
      .isEmpty(),
    check('program', 'Program is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      maximumBatchStrength,
      startDate,
      endDate,
      program
    } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 1) {
        return res.status(400).json({ msg: 'User is not authorized' });
      }

      const enrollment = await Enrollment.find();
      enrollment[0].semesters.map(semester => {
        if (semester._id.toString() === req.params.id) {
          semester.name = name;
          semester.description = description;
          semester.maximumBatchStrength = maximumBatchStrength;
          semester.startDate = startDate;
          semester.endDate = endDate;
          semester.program = program;
        }
        return semester;
      });

      const semester = await enrollment[0].semesters.filter(
        semester => semester._id.toString() === req.params.id
      )[0];

      await enrollment[0].save();
      res.json(semester);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  DELETE /api/enrollments/remove-enrollment-semester/:id
// @desc   Remove enrollment semester by id
// @access Private
router.delete('/remove-enrollment-semester/:id', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.find();
    const removeIndex = enrollment[0].semesters
      .map(semester => semester._id.toString())
      .indexOf(req.params.id);

    enrollment[0].semesters.splice(removeIndex, 1);

    await enrollment[0].save();
    res.json({ msg: 'Semester successfully removed' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
