const mongoose = require('mongoose');

const AnnouncementSchema = mongoose.Schema({
  feeds: [
    {
      name: {
        type: String
      },
      message: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      status: {
        type: Boolean,
        default: true
      }
    }
  ]
});

module.exports = Announcement = mongoose.model(
  'announcement',
  AnnouncementSchema
);
