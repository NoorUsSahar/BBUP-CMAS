const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/adminEtc/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../../models/adminEtc/User');
const Course = require('../../../models/adminEtc/Course');

// @route  POST /api/courses/undergraduate-course/major
// @desc   Create an undergraduate major course
// @access Private
router.post(
  '/undergraduate-course/major',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('creditHours', 'Credit hours are required').isInt(),
    check('fee', 'Fee is required').isInt(),
    // check('preRequisite', 'Pre-requisites are required')
    //   .not()
    //   .isEmpty(),
    check(
      'minimumAttendanceRequiredForTerminals',
      'Minimum attendance required for terminals is required'
    ).isInt(),
    check('courseLearningOutcomes', "CLO's are required")
      .not()
      .isEmpty(),
    check('programLearningOutcomes', "PLO's are required")
      .not()
      .isEmpty(),
    check('totalLectures', 'Total Lectures is required').isInt(),
    check('lecturesTakenFaculty', 'Lectures taken faculty is required').isInt(),
    check('lecturesTakenStudent', 'Lectures taken student is required').isInt(),
    check('totalAssignments', 'Total Assignment is required').isInt(),
    check('assignmentsTaken', 'Assignments taken is required').isInt(),
    check('totalQuizes', 'Total Quizes is required').isInt(),
    check('quizesTaken', 'Quizes taken is required').isInt(),
    check('totalMidTerms', 'Total mid terms is required').isInt(),
    check('midTermsTaken', 'Mid terms taken is required').isInt(),
    check('totalLabs', 'Total labs is required').isInt(),
    check('labsTakenFaculty', 'Labs taken faculty is required').isInt(),
    check('labsTakenStudent', 'Labs taken student is required').isInt(),
    check('labManual', 'Lab manual is required')
      .not()
      .isEmpty(),
    check(
      'labProjectTotalMarks',
      'Lab project total marks is required'
    ).isInt(),
    // check(
    //   'labProjectScoredMarks',
    //   'Lab project scored marks is required'
    // ).isInt(),
    check(
      'labTerminalTotalMarks',
      'Lab terminal total marks is required'
    ).isInt(),
    // check(
    //   'labTerminalScoredMarks',
    //   'Lab terminal scored marks is required'
    // ).toInt(),
    check('program', 'Program is required')
      .not()
      .isEmpty(),
    check('department', 'Department is required')
      .not()
      .isEmpty(),
    check('section', 'Section is required')
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
      creditHours,
      fee,
      preRequisite,
      minimumAttendanceRequiredForTerminals,
      courseLearningOutcomes,
      programLearningOutcomes,
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent,
      totalAssignments,
      assignmentsTaken,
      totalQuizes,
      quizesTaken,
      totalMidTerms,
      midTermsTaken,
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      //   labProjectScoredMarks,
      labTerminalTotalMarks,
      //   labTerminalScoredMarks,
      program,
      department,
      section
    } = req.body;

    let courseFields = {};

    courseFields.name = name;
    courseFields.description = description;
    courseFields.creditHours = creditHours;
    courseFields.fee = fee;

    courseFields.preRequisite = preRequisite;
    courseFields.minimumAttendanceRequiredForTerminals = minimumAttendanceRequiredForTerminals;
    courseFields.courseLearningOutcomes = courseLearningOutcomes;
    courseFields.programLearningOutcomes = programLearningOutcomes;
    courseFields.program = program;
    courseFields.department = department;
    courseFields.section = section;

    let lectures = {
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent
    };

    let assignments = {
      totalAssignments,
      assignmentsTaken
    };

    let quizes = {
      totalQuizes,
      quizesTaken
    };

    let midTerms = {
      totalMidTerms,
      midTermsTaken
    };

    let labs = {
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      labTerminalTotalMarks
    };

    courseFields.lectures = lectures;
    courseFields.assignments = assignments;
    courseFields.quizes = quizes;
    courseFields.midTerms = midTerms;
    courseFields.labs = labs;

    try {
      const course = new Course(courseFields);

      course.type = 0;
      course.category = 0;

      await course.save();
      res.json(course);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  POST /api/courses/undergraduate-course/minor
// @desc   Create an undergraduate minor course
// @access Private
router.post(
  '/undergraduate-course/minor',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('creditHours', 'Credit hours are required').isInt(),
    check('fee', 'Fee is required').isInt(),
    // check('category', 'Category is required').isInt(),
    // check('preRequisite', 'Pre-requisites are required')
    //   .not()
    //   .isEmpty(),
    check(
      'minimumAttendanceRequiredForTerminals',
      'Minimum attendance required for terminals is required'
    ).isInt(),
    check('courseLearningOutcomes', "CLO's are required")
      .not()
      .isEmpty(),
    check('programLearningOutcomes', "PLO's are required")
      .not()
      .isEmpty(),
    check('totalLectures', 'Total Lectures is required').isInt(),
    check('lecturesTakenFaculty', 'Lectures taken faculty is required').isInt(),
    check('lecturesTakenStudent', 'Lectures taken student is required').isInt(),
    check('totalAssignments', 'Total Assignment is required').isInt(),
    check('assignmentsTaken', 'Assignments taken is required').isInt(),
    check('totalQuizes', 'Total Quizes is required').isInt(),
    check('quizesTaken', 'Quizes taken is required').isInt(),
    check('totalMidTerms', 'Total mid terms is required').isInt(),
    check('midTermsTaken', 'Mid terms taken is required').isInt(),
    check('totalLabs', 'Total labs is required').isInt(),
    check('labsTakenFaculty', 'Labs taken faculty is required').isInt(),
    check('labsTakenStudent', 'Labs taken student is required').isInt(),
    check('labManual', 'Lab manual is required')
      .not()
      .isEmpty(),
    check(
      'labProjectTotalMarks',
      'Lab project total marks is required'
    ).isInt(),
    // check(
    //   'labProjectScoredMarks',
    //   'Lab project scored marks is required'
    // ).isInt(),
    check(
      'labTerminalTotalMarks',
      'Lab terminal total marks is required'
    ).isInt(),
    // check(
    //   'labTerminalScoredMarks',
    //   'Lab terminal scored marks is required'
    // ).toInt(),
    check('program', 'Program is required')
      .not()
      .isEmpty(),
    check('department', 'Department is required')
      .not()
      .isEmpty(),
    check('section', 'Section is required')
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
      creditHours,
      fee,
      // category,
      preRequisite,
      minimumAttendanceRequiredForTerminals,
      courseLearningOutcomes,
      programLearningOutcomes,
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent,
      totalAssignments,
      assignmentsTaken,
      totalQuizes,
      quizesTaken,
      totalMidTerms,
      midTermsTaken,
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      //   labProjectScoredMarks,
      labTerminalTotalMarks,
      //   labTerminalScoredMarks,
      program,
      department,
      section
    } = req.body;

    let courseFields = {};

    courseFields.name = name;
    courseFields.description = description;
    courseFields.creditHours = creditHours;
    courseFields.fee = fee;
    // courseFields.category = category;
    courseFields.preRequisite = preRequisite;
    courseFields.minimumAttendanceRequiredForTerminals = minimumAttendanceRequiredForTerminals;
    courseFields.courseLearningOutcomes = courseLearningOutcomes;
    courseFields.programLearningOutcomes = programLearningOutcomes;
    courseFields.program = program;
    courseFields.department = department;
    courseFields.section = section;

    let lectures = {
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent
    };

    let assignments = {
      totalAssignments,
      assignmentsTaken
    };

    let quizes = {
      totalQuizes,
      quizesTaken
    };

    let midTerms = {
      totalMidTerms,
      midTermsTaken
    };

    let labs = {
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      labTerminalTotalMarks
    };

    courseFields.lectures = lectures;
    courseFields.assignments = assignments;
    courseFields.quizes = quizes;
    courseFields.midTerms = midTerms;
    courseFields.labs = labs;

    try {
      const course = new Course(courseFields);

      course.type = 0;
      course.category = 1;

      await course.save();
      res.json(course);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  POST /api/courses/graduate-course/major
// @desc   Create an graduate major course
// @access Private
router.post(
  '/graduate-course/major',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('creditHours', 'Credit hours are required').isInt(),
    check('fee', 'Fee is required').isInt(),
    check('category', 'Category is required').isInt(),
    check('preRequisite', 'Pre-requisites are required')
      .not()
      .isEmpty(),
    check(
      'minimumAttendanceRequiredForTerminals',
      'Minimum attendance required for terminals is required'
    ).isInt(),
    check('courseLearningOutcomes', "CLO's are required")
      .not()
      .isEmpty(),
    check('programLearningOutcomes', "PLO's are required")
      .not()
      .isEmpty(),
    check('totalLectures', 'Total Lectures is required').isInt(),
    check('lecturesTakenFaculty', 'Lectures taken faculty is required').isInt(),
    check('lecturesTakenStudent', 'Lectures taken student is required').isInt(),
    check('totalAssignments', 'Total Assignment is required').isInt(),
    check('assignmentsTaken', 'Assignments taken is required').isInt(),
    check('totalQuizes', 'Total Quizes is required').isInt(),
    check('quizesTaken', 'Quizes taken is required').isInt(),
    check('totalMidTerms', 'Total mid terms is required').isInt(),
    check('midTermsTaken', 'Mid terms taken is required').isInt(),
    check('totalLabs', 'Total labs is required').isInt(),
    check('labsTakenFaculty', 'Labs taken faculty is required').isInt(),
    check('labsTakenStudent', 'Labs taken student is required').isInt(),
    check('labManual', 'Lab manual is required')
      .not()
      .isEmpty(),
    check(
      'labProjectTotalMarks',
      'Lab project total marks is required'
    ).isInt(),
    // check(
    //   'labProjectScoredMarks',
    //   'Lab project scored marks is required'
    // ).isInt(),
    check(
      'labTerminalTotalMarks',
      'Lab terminal total marks is required'
    ).isInt(),
    // check(
    //   'labTerminalScoredMarks',
    //   'Lab terminal scored marks is required'
    // ).toInt(),
    check('program', 'Program is required')
      .not()
      .isEmpty(),
    check('department', 'Department is required')
      .not()
      .isEmpty(),
    check('section', 'Section is required')
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
      creditHours,
      fee,
      category,
      preRequisite,
      minimumAttendanceRequiredForTerminals,
      courseLearningOutcomes,
      programLearningOutcomes,
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent,
      totalAssignments,
      assignmentsTaken,
      totalQuizes,
      quizesTaken,
      totalMidTerms,
      midTermsTaken,
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      //   labProjectScoredMarks,
      labTerminalTotalMarks,
      //   labTerminalScoredMarks,
      program,
      department,
      section
    } = req.body;

    let courseFields = {};

    courseFields.name = name;
    courseFields.description = description;
    courseFields.creditHours = creditHours;
    courseFields.fee = fee;
    courseFields.category = category;
    courseFields.preRequisite = preRequisite;
    courseFields.minimumAttendanceRequiredForTerminals = minimumAttendanceRequiredForTerminals;
    courseFields.courseLearningOutcomes = courseLearningOutcomes;
    courseFields.programLearningOutcomes = programLearningOutcomes;
    courseFields.program = program;
    courseFields.department = department;
    courseFields.section = section;

    let lectures = {
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent
    };

    let assignments = {
      totalAssignments,
      assignmentsTaken
    };

    let quizes = {
      totalQuizes,
      quizesTaken
    };

    let midTerms = {
      totalMidTerms,
      midTermsTaken
    };

    let labs = {
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      labTerminalTotalMarks
    };

    courseFields.lectures = lectures;
    courseFields.assignments = assignments;
    courseFields.quizes = quizes;
    courseFields.midTerms = midTerms;
    courseFields.labs = labs;

    try {
      const course = new Course(courseFields);

      course.type = 1;
      course.category = 0;

      await course.save();
      res.json(course);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  POST /api/courses/graduate-course/minor
// @desc   Create an graduate minor course
// @access Private
router.post(
  '/graduate-course/minor',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('creditHours', 'Credit hours are required').isInt(),
    check('fee', 'Fee is required').isInt(),
    check('category', 'Category is required').isInt(),
    check('preRequisite', 'Pre-requisites are required')
      .not()
      .isEmpty(),
    check(
      'minimumAttendanceRequiredForTerminals',
      'Minimum attendance required for terminals is required'
    ).isInt(),
    check('courseLearningOutcomes', "CLO's are required")
      .not()
      .isEmpty(),
    check('programLearningOutcomes', "PLO's are required")
      .not()
      .isEmpty(),
    check('totalLectures', 'Total Lectures is required').isInt(),
    check('lecturesTakenFaculty', 'Lectures taken faculty is required').isInt(),
    check('lecturesTakenStudent', 'Lectures taken student is required').isInt(),
    check('totalAssignments', 'Total Assignment is required').isInt(),
    check('assignmentsTaken', 'Assignments taken is required').isInt(),
    check('totalQuizes', 'Total Quizes is required').isInt(),
    check('quizesTaken', 'Quizes taken is required').isInt(),
    check('totalMidTerms', 'Total mid terms is required').isInt(),
    check('midTermsTaken', 'Mid terms taken is required').isInt(),
    check('totalLabs', 'Total labs is required').isInt(),
    check('labsTakenFaculty', 'Labs taken faculty is required').isInt(),
    check('labsTakenStudent', 'Labs taken student is required').isInt(),
    check('labManual', 'Lab manual is required')
      .not()
      .isEmpty(),
    check(
      'labProjectTotalMarks',
      'Lab project total marks is required'
    ).isInt(),
    // check(
    //   'labProjectScoredMarks',
    //   'Lab project scored marks is required'
    // ).isInt(),
    check(
      'labTerminalTotalMarks',
      'Lab terminal total marks is required'
    ).isInt(),
    // check(
    //   'labTerminalScoredMarks',
    //   'Lab terminal scored marks is required'
    // ).toInt(),
    check('program', 'Program is required')
      .not()
      .isEmpty(),
    check('department', 'Department is required')
      .not()
      .isEmpty(),
    check('section', 'Section is required')
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
      creditHours,
      fee,
      category,
      preRequisite,
      minimumAttendanceRequiredForTerminals,
      courseLearningOutcomes,
      programLearningOutcomes,
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent,
      totalAssignments,
      assignmentsTaken,
      totalQuizes,
      quizesTaken,
      totalMidTerms,
      midTermsTaken,
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      //   labProjectScoredMarks,
      labTerminalTotalMarks,
      //   labTerminalScoredMarks,
      program,
      department,
      section
    } = req.body;

    let courseFields = {};

    courseFields.name = name;
    courseFields.description = description;
    courseFields.creditHours = creditHours;
    courseFields.fee = fee;
    courseFields.category = category;
    courseFields.preRequisite = preRequisite;
    courseFields.minimumAttendanceRequiredForTerminals = minimumAttendanceRequiredForTerminals;
    courseFields.courseLearningOutcomes = courseLearningOutcomes;
    courseFields.programLearningOutcomes = programLearningOutcomes;
    courseFields.program = program;
    courseFields.department = department;
    courseFields.section = section;

    let lectures = {
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent
    };

    let assignments = {
      totalAssignments,
      assignmentsTaken
    };

    let quizes = {
      totalQuizes,
      quizesTaken
    };

    let midTerms = {
      totalMidTerms,
      midTermsTaken
    };

    let labs = {
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      labTerminalTotalMarks
    };

    courseFields.lectures = lectures;
    courseFields.assignments = assignments;
    courseFields.quizes = quizes;
    courseFields.midTerms = midTerms;
    courseFields.labs = labs;

    try {
      const course = new Course(courseFields);

      course.type = 1;
      course.category = 1;

      await course.save();
      res.json(course);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/courses/undergraduate-course/:id
// @desc   Update a undergraduate course
// @access Private
router.put(
  '/undergraduate-course/:id',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('creditHours', 'Credit hours are required').isInt(),
    check('fee', 'Fee is required').isInt(),
    // check('category', 'Category is required').isInt(),
    // check('preRequisite', 'Pre-requisites are required')
    //   .not()
    //   .isEmpty(),
    check(
      'minimumAttendanceRequiredForTerminals',
      'Minimum attendance required for terminals is required'
    ).isInt(),
    check('courseLearningOutcomes', "CLO's are required")
      .not()
      .isEmpty(),
    check('programLearningOutcomes', "PLO's are required")
      .not()
      .isEmpty(),
    check('totalLectures', 'Total Lectures is required').isInt(),
    check('lecturesTakenFaculty', 'Lectures taken faculty is required').isInt(),
    check('lecturesTakenStudent', 'Lectures taken student is required').isInt(),
    check('totalAssignments', 'Total Assignment is required').isInt(),
    check('assignmentsTaken', 'Assignments taken is required').isInt(),
    check('totalQuizes', 'Total Quizes is required').isInt(),
    check('quizesTaken', 'Quizes taken is required').isInt(),
    check('totalMidTerms', 'Total mid terms is required').isInt(),
    check('midTermsTaken', 'Mid terms taken is required').isInt(),
    check('totalLabs', 'Total labs is required').isInt(),
    check('labsTakenFaculty', 'Labs taken faculty is required').isInt(),
    check('labsTakenStudent', 'Labs taken student is required').isInt(),
    check('labManual', 'Lab manual is required')
      .not()
      .isEmpty(),
    check(
      'labProjectTotalMarks',
      'Lab project total marks is required'
    ).isInt(),
    // check(
    //   'labProjectScoredMarks',
    //   'Lab project scored marks is required'
    // ).isInt(),
    check(
      'labTerminalTotalMarks',
      'Lab terminal total marks is required'
    ).isInt(),
    // check(
    //   'labTerminalScoredMarks',
    //   'Lab terminal scored marks is required'
    // ).toInt(),
    check('program', 'Program is required')
      .not()
      .isEmpty(),
    check('department', 'Department is required')
      .not()
      .isEmpty(),
    check('section', 'Section is required')
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
      creditHours,
      fee,
      // category,
      preRequisite,
      minimumAttendanceRequiredForTerminals,
      courseLearningOutcomes,
      programLearningOutcomes,
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent,
      totalAssignments,
      assignmentsTaken,
      totalQuizes,
      quizesTaken,
      totalMidTerms,
      midTermsTaken,
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      //   labProjectScoredMarks,
      labTerminalTotalMarks,
      //   labTerminalScoredMarks,
      program,
      department,
      section
    } = req.body;

    let courseFields = {};

    courseFields.name = name;
    courseFields.description = description;
    courseFields.creditHours = creditHours;
    courseFields.fee = fee;
    // courseFields.category = category;
    courseFields.preRequisite = preRequisite;
    courseFields.minimumAttendanceRequiredForTerminals = minimumAttendanceRequiredForTerminals;
    courseFields.courseLearningOutcomes = courseLearningOutcomes;
    courseFields.programLearningOutcomes = programLearningOutcomes;
    courseFields.program = program;
    courseFields.department = department;
    courseFields.section = section;

    let lectures = {
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent
    };

    let assignments = {
      totalAssignments,
      assignmentsTaken
    };

    let quizes = {
      totalQuizes,
      quizesTaken
    };

    let midTerms = {
      totalMidTerms,
      midTermsTaken
    };

    let labs = {
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      labTerminalTotalMarks
    };

    courseFields.lectures = lectures;
    courseFields.assignments = assignments;
    courseFields.quizes = quizes;
    courseFields.midTerms = midTerms;
    courseFields.labs = labs;

    try {
      const course = await Course.findOneAndUpdate(
        { _id: req.params.id },
        { $set: courseFields },
        { new: true }
      );

      res.json(course);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/courses/graduate-course/:id
// @desc   Update a graduate course
// @access Private
router.put(
  '/graduate-course/:id',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('creditHours', 'Credit hours are required').isInt(),
    check('fee', 'Fee is required').isInt(),
    check('category', 'Category is required').isInt(),
    check('preRequisite', 'Pre-requisites are required')
      .not()
      .isEmpty(),
    check(
      'minimumAttendanceRequiredForTerminals',
      'Minimum attendance required for terminals is required'
    ).isInt(),
    check('courseLearningOutcomes', "CLO's are required")
      .not()
      .isEmpty(),
    check('programLearningOutcomes', "PLO's are required")
      .not()
      .isEmpty(),
    check('totalLectures', 'Total Lectures is required').isInt(),
    check('lecturesTakenFaculty', 'Lectures taken faculty is required').isInt(),
    check('lecturesTakenStudent', 'Lectures taken student is required').isInt(),
    check('totalAssignments', 'Total Assignment is required').isInt(),
    check('assignmentsTaken', 'Assignments taken is required').isInt(),
    check('totalQuizes', 'Total Quizes is required').isInt(),
    check('quizesTaken', 'Quizes taken is required').isInt(),
    check('totalMidTerms', 'Total mid terms is required').isInt(),
    check('midTermsTaken', 'Mid terms taken is required').isInt(),
    check('totalLabs', 'Total labs is required').isInt(),
    check('labsTakenFaculty', 'Labs taken faculty is required').isInt(),
    check('labsTakenStudent', 'Labs taken student is required').isInt(),
    check('labManual', 'Lab manual is required')
      .not()
      .isEmpty(),
    check(
      'labProjectTotalMarks',
      'Lab project total marks is required'
    ).isInt(),
    // check(
    //   'labProjectScoredMarks',
    //   'Lab project scored marks is required'
    // ).isInt(),
    check(
      'labTerminalTotalMarks',
      'Lab terminal total marks is required'
    ).isInt(),
    // check(
    //   'labTerminalScoredMarks',
    //   'Lab terminal scored marks is required'
    // ).toInt(),
    check('program', 'Program is required')
      .not()
      .isEmpty(),
    check('department', 'Department is required')
      .not()
      .isEmpty(),
    check('section', 'Section is required')
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
      creditHours,
      fee,
      category,
      preRequisite,
      minimumAttendanceRequiredForTerminals,
      courseLearningOutcomes,
      programLearningOutcomes,
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent,
      totalAssignments,
      assignmentsTaken,
      totalQuizes,
      quizesTaken,
      totalMidTerms,
      midTermsTaken,
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      //   labProjectScoredMarks,
      labTerminalTotalMarks,
      //   labTerminalScoredMarks,
      program,
      department,
      section
    } = req.body;

    let courseFields = {};

    courseFields.name = name;
    courseFields.description = description;
    courseFields.creditHours = creditHours;
    courseFields.fee = fee;
    courseFields.category = category;
    courseFields.preRequisite = preRequisite;
    courseFields.minimumAttendanceRequiredForTerminals = minimumAttendanceRequiredForTerminals;
    courseFields.courseLearningOutcomes = courseLearningOutcomes;
    courseFields.programLearningOutcomes = programLearningOutcomes;
    courseFields.program = program;
    courseFields.department = department;
    courseFields.section = section;

    let lectures = {
      totalLectures,
      lecturesTakenFaculty,
      lecturesTakenStudent
    };

    let assignments = {
      totalAssignments,
      assignmentsTaken
    };

    let quizes = {
      totalQuizes,
      quizesTaken
    };

    let midTerms = {
      totalMidTerms,
      midTermsTaken
    };

    let labs = {
      totalLabs,
      labsTakenFaculty,
      labsTakenStudent,
      labManual,
      labProjectTotalMarks,
      labTerminalTotalMarks
    };

    courseFields.lectures = lectures;
    courseFields.assignments = assignments;
    courseFields.quizes = quizes;
    courseFields.midTerms = midTerms;
    courseFields.labs = labs;

    try {
      const course = await Course.findOneAndUpdate(
        { _id: req.params.id },
        { $set: courseFields },
        { new: true }
      );

      res.json(course);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/courses/undergraduate-courses
// @desc   Get all undergraduate courses major and minor
// @access Private
router.get('/undergraduate-courses', auth, async (req, res) => {
  try {
    const undergraduateCourses = await Course.find({
      type: 0
    }).populate('program', ['name', 'department.name']);

    res.json(undergraduateCourses);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/courses/graduate-courses
// @desc   Get all graduate courses major and minor
// @access Private
router.get('/graduate-courses', auth, async (req, res) => {
  try {
    const graduateCourses = await Course.find({ type: 1 }).populate(
      'programme',
      ['name', 'department.name']
    );

    res.json(graduateCourses);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/courses/undergraduate-courses/section/:id
// @desc   Get all undergraduate courses in section
// @access Private
router.get('/undergraduate-courses/section/:id', auth, async (req, res) => {
  try {
    const undergraduateCourses = await Course.find({
      type: 0,
      section: req.params.id
    }).populate('program', ['name', '_id']);

    res.json(undergraduateCourses);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/courses/graduate-courses/section/:id
// @desc   Get all graduate courses in section
// @access Private
router.get('/graduate-courses/section/:id', auth, async (req, res) => {
  try {
    const graduateCourses = await Course.find({
      type: 1,
      section: req.params.id
    }).populate('program', ['name', '_id']);

    res.json(graduateCourses);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/courses/:id
// @desc   Get courses major and minor by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.send(400).json({ msg: 'Course does not exist' });
    }

    res.json(course);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/courses/enable/:id
// @desc   Enable course by id
// @access Private
router.put('/enable/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(400).json({ msg: 'Course does not exist.' });
    }

    course.isOffered = true;

    await course.save();
    res.json(course);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/courses/undergraduate-disable/all
// @desc   Disable all the undergraduate courses
// @access Private
router.put('/undergraduate-disable/all', auth, async (req, res) => {
  try {
    const courses = await Course.find({ type: 0 });

    await Promise.all(
      courses.map(course => {
        return new Promise(resolve => {
          course.isOffered = false;
          course.save().then(() => resolve());
        });
      })
    );

    res.json({ msg: 'All courses have been disabled successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/courses/graduate-disable/all
// @desc   Disable all the graduate courses
// @access Private
router.put('/graduate-disable/all', auth, async (req, res) => {
  try {
    const courses = await Course.find({ type: 1 });

    await Promise.all(
      courses.map(course => {
        return new Promise(resolve => {
          course.isOffered = false;
          course.save().then(() => resolve());
        });
      })
    );

    res.json({ msg: 'All courses have been disabled successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/courses/disable/:id
// @desc   Disable course by id
// @access Private
router.put('/disable/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(400).json({ msg: 'Course does not exist.' });
    }

    course.isOffered = false;

    await course.save();
    res.json(course);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/courses/undergraduate-courses/program/:id
// @desc   Get all undergraduate courses (major and minor) in program of a department
// @access Private
router.get('/undergraduate-courses/program/:id', auth, async (req, res) => {
  try {
    const undergraduateCourses = await Course.find({
      type: 0,
      programme: req.params.id
    }).populate('programme', ['name', 'department.name']);

    res.json(undergraduateCourses);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/courses/graduate-courses/program/:id
// @desc   Get all graduate courses (major and minor) in program of a department
// @access Private
router.get('/graduate-courses/program/:id', auth, async (req, res) => {
  try {
    const graduateCourses = await Course.find({
      type: 1,
      programme: req.params.id
    }).populate('programme', ['name', 'department.name']);

    res.json(graduateCourses);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  DELETE /api/courses/:id
// @desc   Remove a course by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Course.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Course successfully removed' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
