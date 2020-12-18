const express = require('express');
const router = express.Router();
const ProfileinAdmin = require('../../../models/adminEtc/Profile');
const User = require('../../../models/adminEtc/User');
const auth = require('../../../middleware/adminEtc/auth');
const { check, validationResult } = require('express-validator');

//Faculty Center
const Profile = require("../../../models/facultysc/Profile");
const Faculty = require("../../../models/facultysc/Faculty");


// @route  GET /api/profile/me
// @desc   Get user profile based on id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const profile = await ProfileinAdmin.findOne({
      user: req.params.id
    }).populate('user', ['name', 'email', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'Profile of this user does not exist' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/profile/admin
// @desc   Get all profiles of admins
// @access Private
router.get('/admin', auth, async (req, res) => {
  try {
    const profiles = await ProfileinAdmin.find({ type: 0 }).populate('user', [
      'name',
      'email',
      'avatar'
    ]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/profile/coordinator
// @desc   Get all profiles of coordinators
// @access Private
router.get('/coordinator', auth, async (req, res) => {
  try {
    const profiles = await ProfileinAdmin.find({ type: 1 }).populate('user', [
      'name',
      'email',
      'avatar'
    ]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/profile/my-details
// @desc   Add/Update users personal details
// @access Private
router.put(
  '/personal-details',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    // check('address', 'Address is required')
    //   .not()
    //   .isEmpty(),
    check('dateOfBirth', 'Date of birth is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('cnic', 'CNIC is required').isLength({ min: 1, max: 13 }),
    check('type', 'Type of user is required').isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      // address,
      dateOfBirth,
      description,
      cnic,
      type
    } = req.body;

    let personalDetails = {};

    personalDetails.name = name;
    personalDetails.email = email;
    // personalDetails.address = address;
    personalDetails.dateOfBirth = dateOfBirth;
    personalDetails.description = description;
    personalDetails.cnic = cnic;
    personalDetails.type = type;

    try {
      let profile = await ProfileinAdmin.findOne({ user: req.user.id });

      if (profile) {
        profile = await ProfileinAdmin.findOneAndUpdate(
          { user: req.user.id },
          { $set: { personalDetails } },
          { new: true }
        );
      } else {
        profile = new ProfileinAdmin({ personalDetails });
      }

      if (profile.status < 1) {
        profile.status = 1;
      }

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/profile/experience-details
// @desc   Add/Update users experience details
// @access Private
router.put(
  '/experience-details',
  [
    auth,
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('company', 'Company is required')
      .not()
      .isEmpty(),
    check('location', 'Location is required')
      .not()
      .isEmpty(),
    check('from', 'From is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    let experienceDetails = {};

    experienceDetails.title = title;
    experienceDetails.company = company;
    experienceDetails.location = location;
    experienceDetails.from = from;
    experienceDetails.to = to;
    experienceDetails.current = current;
    experienceDetails.description = description;

    try {
      let profile = await ProfileinAdmin.findOne({ user: req.user.id });

      if (profile) {
        profile = await ProfileinAdmin.findOneAndUpdate(
          { user: req.user.id },
          { $set: { experienceDetails } },
          { new: true }
        );
      } else {
        profile = new ProfileinAdmin({ experienceDetails });
      }

      if (profile.status < 2) {
        profile.status = 2;
      }

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/profile/education-details
// @desc   Add/Update users education details
// @access Private
router.put(
  '/education-details',
  [
    auth,
    check('college', 'College is required')
      .not()
      .isEmpty(),
    check('university', 'University is required')
      .not()
      .isEmpty(),
    check('degree', 'Degree is required')
      .not()
      .isEmpty(),
    check('fieldOfStudy', 'FieldOfStudy is required')
      .not()
      .isEmpty(),
    check('from', 'From is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const {
      college,
      university,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = req.body;

    let educationDetails = {};

    educationDetails.college = college;
    educationDetails.university = university;
    educationDetails.degree = degree;
    educationDetails.fieldOfStudy = fieldOfStudy;
    educationDetails.from = from;
    educationDetails.to = to;
    educationDetails.current = current;
    educationDetails.description = description;
    try {
      let profile = await ProfileinAdmin.findOne({ user: req.user.id });

      if (profile) {
        profile = await ProfileinAdmin.findByIdAndUpdate(
          { user: req.user.id },
          { $set: { educationDetails } },
          { new: true }
        );
      } else {
        profile = new ProfileinAdmin({ educationDetails });
      }

      if (profile.status < 3) {
        profile.status = 3;
      }

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE /api/profile/delete-profile/:id
//@desc   Delete user profile based on id
//@access Private
router.delete('/delete-profile/:id', auth, async (req, res) => {
  try {
    const profile = await ProfileinAdmin.findOneAndRemove({ user: req.user.id });

    res.json({ msg: 'Profile has been successfully removed' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});


//Faculty Self Center

//@route        GET api/profile/me
//@desc         Get current user's profile
//@access       Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      faculty: req.faculty.id,
    }).populate("faculty", ["name", "email"]);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is not profile for this faculty member" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route        GET api/profile/FACULTY
//@desc         Get current faculty's account by id
//@access       Private
router.get("/faculty-account/:faculty_id", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.faculty_id)
    if (!faculty) {
      return res
        .status(400)
        .json({ msg: "There is no faculty " });
    }

    res.json(faculty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});


//@route        POST api/profile
//@desc         Create or update  a user profile
//@access       Private

router.post(
  "/",
  [
    auth,
    [
      check("designation", "Designation is requires").not().isEmpty(),
      check("courses_teaching", "Courses teaching is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      phone_number,
      bio,
      website,
      address,
      designation,
      courses_teaching,
      department
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.faculty = req.faculty.id;

    if (phone_number) profileFields.phone_number = phone_number;
    if (department) profileFields.department = department;
    if (bio) profileFields.bio = bio;
    if (website) profileFields.website = website;
    if (address) profileFields.address = address;
    if (designation) profileFields.designation = designation;
    if (courses_teaching) {
      profileFields.courses_teaching = courses_teaching
        .split(",")
        .map((courses_teaching) => courses_teaching.trim());
    }

    // profileFields.research_papers = {};
    // if (title) profileFields.research_papers.title = title;
    // if (date) profileFields.research_papers.date = date;
    // if (author) {
    //   profileFields.research_papers.author = author
    //     .split(",")
    //     .map((author) => author.trim());
    // }
    // if (description) profileFields.research_papers.description = description;

    //update and insert the data
    try {
      let profile = await Profile.findOne({ faculty: req.faculty.id });

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { faculty: req.faculty.id },
          { $set: profileFields },
          { new: true }
        ).populate("faculty", ["name", "email"]);

        return res.json(profile);
      }

      //If not found update  create
      profile = new Profile(profileFields);

      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route        POST api/profile_fac
//@desc         Get all profiles
//@access       Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("faculty", [
      "name",
      "email",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route        GET api/profile/faculty/:faculty_id
//@desc         Get profile by  faculty_id
//@access       Public

router.get("/faculty/:faculty_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      faculty: req.params.faculty_id,
    }).populate("faculty", ["name", "email"]);

    if (!profile) return res.status(404).send("Profile not found");

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      res.status(404).send("Profile not found");
    }
    res.status(500).send("Server error");
  }
});

//@route        DELETE api/profile
//@desc         Delete Profile , faculty(user)
//@access       Private
router.delete("/", auth ,async (req, res) => {
  try {
    //remove profile
    // await Profile.findOneAndRemove({ faculty: req.faculty.id});
    //Remove user
    await Faculty.findOneAndRemove({ _id: req.faculty.id });

    res.send("User and profile removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route        PUT api/profile/research_papers
//@desc         Add research_papers
//@access       Private
router.put('/research_papers' ,
[
  auth , 
  [
    check('title','Title is required')
    .not()
    .isEmpty(),

    check('date','Date published is required')
    .not()
    .isEmpty(),

    check('author','Authors are required')
    .not()
    .isEmpty(),
  ]
] , 
async (req, res)  => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()});
    }

    
    const { 
      title,
      date,
      author,
      description
    } = req.body;

  
    const newResearch = {
      title , 
      date, 
      author,
      description
    }

    try {
      const profile = await Profile.findOne({ faculty: req.faculty.id});
      
      //unshift pushes in the beginning
      profile.research_papers.unshift(newResearch);
      await profile.save();
      
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route        DELETE api/profile/research_papers/:paper_id
//@desc         Delete a research_papers from profile
//@access       Private

router.delete('/research_papers/:paper_id' , auth , async (req, res) => {
      try {
        const profile = await Profile.findOne({ faculty: req.faculty.id});
        
        //Get remove index
        const removeIndex = profile.research_papers
                            .map(item => item.id)
                            .indexOf(req.params.paper_id);
        
        profile.research_papers.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");          
      }
});



//@route        PUT api/profile/education
//@desc         Add education
//@access       Private
router.put('/education' ,
[
  auth , 
  [
    check('institute','Institution is required')
    .not()
    .isEmpty(),

    check('degree','Degree is required')
    .not()
    .isEmpty(),

    check('from','From Date is required')
    .not()
    .isEmpty(),

    check('grade','Grade Date is required')
    .not()
    .isEmpty(),
  ]
] , 
async (req, res)  => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()});
    }

    const { 
      institute,
      degree,
      from,
      to,
      grade,
      
    } = req.body;

    const newEducation = {
      institute,
      degree,
      from,
      to,
      grade,
    }

    try {
      const profile = await Profile.findOne({ faculty: req.faculty.id});

      //unshift pushes in the beginning
      profile.education.unshift(newEducation);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route        DELETE api/profile/education/:education_id
//@desc         Delete a education from profile
//@access       Private

router.delete('/education/:education_id' , auth , async (req, res) => {
  try {
    const profile = await Profile.findOne({ faculty: req.faculty.id});
    
    //Get remove index
    const removeIndex = profile.education
                        .map(item => item.id)
                        .indexOf(req.params.education_id);
    
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");          
  }
});


//@route        PUT api/profile/exprience
//@desc         Add experience
//@access       Private
router.put('/experience' ,
[
  auth , 
  [
    check('company','Company is required')
    .not()
    .isEmpty(),

    check('designation','Designation is required')
    .not()
    .isEmpty(),

    check('from','From Date is required')
    .not()
    .isEmpty()
  ]
] , 
async (req, res)  => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()});
    }

    const { 
      company,
      designation,
      from,
      to
      
    } = req.body;

    const newExperience = {
      company,
      designation,
      from,
      to
    }

    try {
      const profile = await Profile.findOne({ faculty: req.faculty.id});

      //unshift pushes in the beginning
      profile.experience.unshift(newExperience);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route        DELETE api/profile/experience/:experience_id
//@desc         Delete a experience from profile
//@access       Private

router.delete('/experience/:experience_id' , auth , async (req, res) => {
  try {
    const profile = await Profile.findOne({ faculty: req.faculty.id});
    
    //Get remove index
    const removeIndex = profile.experience
                        .map(item => item.id)
                        .indexOf(req.params.experience_id);
    
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");          
  }
});

module.exports = router;
