const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "774050817939-q49sqkndrd5f0puk48jveptn9urgs9qm.apps.googleusercontent.com", //Client ID
  "qLeO1es3JBrQCcvv_Kg9vQc3", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  //refresh token added because the access token expires in 3600sec
  refresh_token:
    "1//04Gq8_kE-LUJ_CgYIARAAGAQSNwF-L9Ir40v9ne1wuudNOZjspWf4LpuK8pQDIoV0xEl6RlxpKDtp0uxhxqnxVYM6yDVa6hjheXc",
});
const accessToken = oauth2Client.getAccessToken();

//create transport route
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "noorussahr@gmail.com",
    clientId:
      "774050817939-q49sqkndrd5f0puk48jveptn9urgs9qm.apps.googleusercontent.com",
    clientSecret: "qLeO1es3JBrQCcvv_Kg9vQc3",
    refreshToken:
      "1//04Gq8_kE-LUJ_CgYIARAAGAQSNwF-L9Ir40v9ne1wuudNOZjspWf4LpuK8pQDIoV0xEl6RlxpKDtp0uxhxqnxVYM6yDVa6hjheXc",
    accessToken: accessToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.put(
  "/send-email-admin",
  // [check('email', 'Email is required').not().isEmpty()],
  async (req, res) => {
    // smtpTransport.sendMail(mailOptions, (error, response) => {
    //   error ? console.log(error) : console.log(response);
    //   smtpTransport.close();
    // });

    try {
      const { email, name, subject, body } = req.body;

      const mailOptions = {
        from: "BBU Chatbot <noorussahr@gmail.com>",
        to: "fypcmas@gmail.com",
        subject: `Complaint / Suggestion `,
        generateTextFromHTML: true,
        html: `<p>This is a message generated by chatbot on user's request <p/>
        <h4>Name : ${name}</h4>
        <h4>Email : ${email}</h4>
        <p>${body}</p>`,
      };
      await smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json({ msg: "Email sent successfully" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Email not sent due to error");
    }
  }
);

module.exports = router;
