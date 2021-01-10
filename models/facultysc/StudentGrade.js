const mongoose = require('mongoose');
const StudentGradeSchema = new mongoose.Schema({
      faculty:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'faculty'
      },
    Name:{
        type: String, 
        required: true
    },
    registrationNo:{
        type: String, 
        required: true,
        unique:true
    },

    semester:{
        type:Number,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    ECA:{
        type:Number,
        required:true
    },
    ICP:{
        type:Number,
        required:true
    },
    ENG:{
        type:Number,
        required:true
    },
    Cal:{
        type:Number,
        required:true
    },
    ISL:{
        type:Number,
        required:true
    },
    gpa:{
            
        type:mongoose.SchemaTypes.Decimal128,  
        required:true
        },
    cgpa:{
            
        type: mongoose.SchemaTypes.Decimal128,  
        required:true
    },


});

module.exports = StudentGrade= mongoose.model('studentgrade' ,StudentGradeSchema);