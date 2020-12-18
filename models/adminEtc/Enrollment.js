const mongoose = require('mongoose');

const EnrollementSchema = mongoose.Schema({
  semesters: [
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      maximumBatchStrength: {
        type: Number,
        default: 0
      },
      status: {
        type: Boolean,
        default: true
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'programme'
      },
      courseList: [
        {
          courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
          }
        }
      ],
      sectionList: [
        {
          sectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'section'
          }
        }
      ]
    }
  ]
});

module.exports = Enrollment = mongoose.model('enrollment', EnrollementSchema);
