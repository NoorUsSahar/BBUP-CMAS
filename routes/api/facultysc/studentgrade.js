const express = require('express');
const router = express.Router();
 const auth = require('../../../middleware/facultysc/auth');
const { check, validationResult} = require('express-validator');
const StudentGrade = require('../../../models/facultysc/StudentGrade');
// const User = require('../../models/User');

// route get api/studentgrade/me
// get current users profile
// private access

router.get('/me', auth , async(req , res)=>
{
    
    try{
        const studentgrade = await StudentGrade.findOne({
            faculty:req.faculty.id
        }).populate('faculty',['name']);
        if(!studentgrade){
            return res.status(400).json({msg:"there is no profile for this user"});
        }
        res.json(studentgrade);
    }
        catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});


// route post api/profile
// get current users profile
// private 
router.post('/',[ auth ,
 [
    check('registrationNo','registrationNo is required')
    .not().isEmpty()
]
],
async(req, res)=>{
     const errors=validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }
     const{
       Name,
        semester,
        registrationNo,
        ECA,
        ICP,
        ENG,
        Cal,
        ISL,
        gpa,
        cgpa,
        section,
     }=req.body;
     // Build profile object
     const profileFeilds ={};
  profileFeilds.faculty=  req.faculty.id;
     if(Name) profileFeilds.Name=Name;
     if(semester) profileFeilds.semester=semester;
     if(registrationNo) profileFeilds.registrationNo=registrationNo;
     if(ECA) profileFeilds.ECA=ECA;
     if(ICP) profileFeilds.ICP=ICP;
     if(ENG) profileFeilds.ENG=ENG;
     if(Cal) profileFeilds.Cal=Cal;
     if(ISL) profileFeilds.ISL=ISL;
     if(gpa) profileFeilds.gpa=gpa;
     if(cgpa) profileFeilds.cgpa=cgpa;
     if(section) profileFeilds.section=section;
    
     console.log(req.faculty.id)
    

     try{
        let studentgrade= await StudentGrade.findOne({ faculty:req.faculty.id});
        if(studentgrade){
            //updated
           studentgrade= await StudentGrade.findOneAndUpdate(
            { faculty:req.faculty.id},
            {$set:profileFeilds},
            {new:true }
            );
    
            return res.json(studentgrade);
            
        }
        // Create
        
        studentgrade= new StudentGrade(profileFeilds);
    
        console.log(studentgrade)

        await studentgrade.save();
        res.json(studentgrade);
    }
     catch(err){
        console.error(err.message);
        res.status(500).send('Server Error ');
     }
   
    });
// route get api/profile
// get all profile
// public
router.get('/', auth , async (req,res)=> {
    try{
        const studentgrades = await StudentGrade.find().populate('faculty',['name']);
        res.json(studentgrades);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// route get api/profile/user/user_id
// get profile by user id
// public
router.get('/student/:student_id',async (req,res)=> {
    try{
        const studentgrade = await StudentGrade.findOne({_id: req.params.student_id});
        if(!studentgrade)
         return res.status(400).json({msg:'Profile not found'});
        res.json(studentgrade);
    }
    catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Profile not found'});
        }
       
        res.status(500).send('Server Error');
    }
});

// route delete api/profile
// delete profile, user and post
// access Private
router.delete('/', auth ,async (req,res)=> {
    try{
        // Remove profile
       await StudentGrade.findOneAndRemove({faculty: req.faculty.id});
       // Remove user
    //    await User.findOneAndRemove({id: req.user.id});
       res.json({msg:'User deleted '});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



    
module.exports= router;
