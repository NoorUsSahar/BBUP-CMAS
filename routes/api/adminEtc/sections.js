const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/adminEtc/auth');
const { check, validationResult } = require('express-validator');
const Section = require('../../../models/adminEtc/Section');
const User = require('../../../models/adminEtc/User');

// @route  POST /api/sections
// @desc   Create a section
// @access Private
router.post(
  '/',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('maximumStrength', 'Maximum strength is required').isInt(),
    check(
      'currentNumberOfStudents',
      'Current number of students is required'
    ).isInt(),
    check('semester', 'Semester is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      maximumStrength,
      currentNumberOfStudents,
      semester
    } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 1) {
        return res.status(400).json({ msg: 'User is not authorized' });
      }

      const section = new Section({
        name,
        maximumStrength,
        currentNumberOfStudents,
        semester
      });

      await section.save();
      res.json(section);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/sections/:id
// @desc   Update a section
// @access Private
router.put(
  '/:id',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('maximumStrength', 'Maximum strength is required').isInt(),
    check(
      'currentNumberOfStudents',
      'Current number of students is required'
    ).isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      maximumStrength,
      currentNumberOfStudents,
      semester
    } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 1) {
        return res.status(400).json({ msg: 'User not authorized' });
      }

      const section = await Section.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name, maximumStrength, currentNumberOfStudents, semester } },
        { new: true }
      );

      res.json(section);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/sections
// @desc   Get all sections
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const sections = await Section.find();

    // if(sections.length < 0){
    //     return res.status(400).json({msg: 'No sections found.'})
    // }

    res.json(sections);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/sections/:id
// @desc   Get section by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);

    if (!section) {
      return res.status(400).json({ msg: 'Section does not exist' });
    }

    res.json(section);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  DELETE /api/sections/:id
// @desc   Remove section by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Section.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Section removed successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
