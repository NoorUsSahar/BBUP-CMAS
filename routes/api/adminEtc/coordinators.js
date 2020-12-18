const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/adminEtc/auth');
const { check, validationResult } = require('express-validator');
const Department = require('../../../models/adminEtc/Department');
const User = require('../../../models/adminEtc/User');

// @route  GET /api/coordinators/department/:id
// @desc   Get coordinators by department id
// @access Private
router.get('/department/:id', auth, async (req, res) => {
  try {
    const departmentCoordinator = await User.find({
      type: 1,
      department: req.params.id
    }).populate('department', ['name', '_id']);

    res.json(departmentCoordinator);

    // const department = await Department.findById(req.params.id);

    // const user = await User.find({ type: 1 }).populate('department', ['name']);

    // if (!user) {
    //   return res
    //     .status(400)
    //     .json({ msg: 'Coordinator does not belong to this department' });
    // } else {
    //   department == user.department;
    // }

    // res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
