const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creditHours: {
    type: Number,
    default: 0
  },
  fee: {
    type: Number,
    default: 0
  },
  category: {
    type: Number
  },
  type: {
    type: Number
  },
  compulsory: {
    type: Boolean,
    default: true
  },
  preRequisite: {
    type: String,
    default: null
  },
  minimumAttendanceRequiredForTerminals: {
    type: Number,
    default: 0
  },
  courseLearningOutcomes: {
    type: String,
    required: true
  },
  programLearningOutcomes: {
    type: String,
    required: true
  },
  isOffered: {
    type: Boolean,
    default: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  lectures: {
    totalLectures: {
      type: Number,
      default: 0
    },
    lecturesTakenFaculty: {
      type: Number,
      default: 0
    },
    lecturesTakenStudent: {
      type: Number,
      default: 0
    }
  },
  assignments: {
    totalAssignments: {
      type: Number,
      default: 0
    },
    assignmentsTaken: {
      type: Number,
      default: 0
    }
  },
  quizes: {
    totalQuizes: {
      type: Number,
      default: 0
    },
    quizesTaken: {
      type: Number,
      default: 0
    }
  },
  midTerms: {
    totalMidTerms: {
      type: Number,
      default: 0
    },
    midTermsTaken: {
      type: Number,
      default: 0
    }
  },
  labs: {
    totalLabs: {
      type: Number,
      default: 0
    },
    labsTakenFaculty: {
      type: Number,
      default: 0
    },
    labsTakenStudent: {
      type: Number,
      default: 0
    },
    labManual: {
      type: String,
      default: null
    },
    labProjectTotalMarks: {
      type: Number,
      default: 0
    },
    // labProjectScoredMarks: {
    //   type: Number,
    //   default: 0
    // },
    labTerminalTotalMarks: {
      type: Number,
      default: 0
    }
    // labTerminalScoredMarks: {
    //   type: Number,
    //   default: 0
    // }
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'programme'
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'section'
  }
});

module.exports = Course = mongoose.model('course', CourseSchema);
