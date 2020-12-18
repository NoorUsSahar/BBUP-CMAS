const mongoose = require('mongoose');

const AdmissionSchema = mongoose.Schema({
  sessions: [
    {
      name: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      timeStamp: {
        type: Date,
        default: Date.now()
      },
      status: {
        type: Boolean,
        default: true
      },
      meritList: [
        {
          applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'applicant'
          }
        }
      ],
      notification: {
        type: String
      }
    }
  ],
  // announcement: {
  //   type: {
  //     type: Number,
  //     required: true
  //   },
  //   text: {
  //     type: String,
  //     required: true
  //   }
  // },
  fee: {
    amount: {
      type: Number
    },
    feePaid: {
      type: Boolean,
      default: false
    }
  }
});

module.exports = Admission = mongoose.model('admission', AdmissionSchema);
