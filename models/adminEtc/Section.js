const mongoose = require('mongoose');

const SectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  maximumStrength: {
    type: Number,
    default: 0
  },
  currentNumberOfStudents: {
    type: Number,
    default: 0
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'enrollment'
  }
});

module.exports = Section = mongoose.model('section', SectionSchema);
