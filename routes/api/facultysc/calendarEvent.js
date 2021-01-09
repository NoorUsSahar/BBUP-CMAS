const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/facultysc/auth");
const { check, validationResult } = require("express-validator");
const ObjectId = require("mongodb").ObjectID;
const CalendarEvent = require("../../../models/facultysc/CalendarEvent");

// const { TitleSharp } = require("@material-ui/icons");
//const Faculty = require("../../models/Faculty");

//@route        GET api/calendar/me
//@desc         Get current user's profile
//@access       Private
router.get("/me", auth, async (req, res) => {
    try {
      const event = await CalendarEvent.findOne({
        faculty: req.faculty.id,
      }).populate("faculty", ["name", "email"]);
  
      if (!event) {
        return res
          .status(400)
          .json({ msg: "There is no event for this profile" });
      }
  
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  });
 
  //@route        GET api/calendar/me
//@desc         Get event by its id
//@access       Private
router.get("/event/:eventId", auth , async (req, res) => {
  try {
    
    const event = await CalendarEvent.findOne({
      faculty: req.faculty.id , 
      'event._id' : req.params.eventId  
    },
    {
      'event.$' : 1
      }
      )
;


    if (!event) {
      return res
        .status(400)
        .json({ msg: "There is no event for this profile" });
    }
    res.json(event.event[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

 //@route        POST api/calendar
  //@desc        update calendar event
  //@access       Private
  
  router.post(
    "/event/:eventId",
    [
      auth,
      [
        check("title", "Title is required").not().isEmpty(),
       // check("", "Courses teaching is required").not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        title , 
        start,
        end,
      } = req.body;
      try {
        
       
          const eventUpdate = await CalendarEvent.findOneAndUpdate( 
            {
              faculty: req.faculty.id , 
              // 'event._id' : req.params.eventId  
            },
            
            { $set: { "event.$[elem].title": title ,
            "event.$[elem].start": start , 
            "event.$[elem].end": end  } },
            { arrayFilters: [ { "elem._id": req.params.eventId } ],
            upsert: true}
            // { new: true }
            );
         
              if(eventUpdate){
                const event = await CalendarEvent.findOne({
                  faculty: req.faculty.id , 
                  'event._id' : req.params.eventId  
                },
                {
                  'event.$' : 1
                  }) ;

               
            if (!event) {
              return res
                .status(400)
                .json({ msg: "There is no event for this profile" });
            }
            res.json(event);
              }
              res
                .status(400)
                .json({ msg: "No Updated due to error" });
              // console.log("Not Updated")
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );
  

  //@route        PUT api/calendar
  //@desc         Create or update calendar event
  //@access       Private
  
  router.put(
    "/",
    [
      auth,
      [
        check("title", "Title is requires").not().isEmpty(),
       // check("", "Courses teaching is required").not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        title , 
        start,
        end,
      } = req.body;
  
     
     
   const newEvent ={
        title , 
        start,
        end
      } 
      try {
        let event = await CalendarEvent.findOne({ faculty: req.faculty.id });
  
        if (event) {
        //if profile with events already exists then add events
           event.event.unshift(newEvent);
          await event.save();
          
          
          return res.json(event);
        }
  
        //If not found a profile with events create profile with events
        
      //build profile object
      const eventFields = {};
      eventFields.faculty = req.faculty.id;
        eventFields.event = {};
      if (title) eventFields.event.title = title;
      if (start) eventFields.event.start = start;
      if (end) eventFields.event.end = end;

        event = new CalendarEvent(eventFields);
  
        await event.save();
        return res.json(event);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );
  
  // router.delete('/', auth, async (req, res) => {
  //   const {
  //     title 
  //   } = req.body;
  //   try {
  //     await Course.findOneAndRemove({ title: TitleSharp});
  
  //     res.json({ msg: 'Course successfully removed' });
  //   } catch (err) {
  //     console.log(err.message);
  //     return res.status(500).send('Server Error');
  //   }
  // });
  module.exports = router;