// 1. create an express server for backend
const express = require('express');
const connectDB = require('./config/db');
const path = require ('path');
const app = express();

//connectDB
connectDB();

//Initialze Middleware
app.use(express.json({ limit: '2mb' }));

// app.get('/', (req, res) => res.send('API Running'));

//Define Routes

//AdminEtc routes
app.use('/api/users', require('./routes/api/adminEtc/users'));
app.use('/api/adminAuth', require('./routes/api/adminEtc/auth'));
app.use('/api/admissions', require('./routes/api/adminEtc/admissions'));
app.use('/api/applicants', require('./routes/api/adminEtc/applicants'));
app.use('/api/departments', require('./routes/api/adminEtc/departments'));
app.use('/api/programs', require('./routes/api/adminEtc/programs'));
app.use('/api/adminProfile', require('./routes/api/adminEtc/profile'));
app.use('/api/coordinators', require('./routes/api/adminEtc/coordinators'));
app.use('/api/announcements', require('./routes/api/adminEtc/announcements'));
app.use('/api/courses', require('./routes/api/adminEtc/courses'));
app.use('/api/sections', require('./routes/api/adminEtc/sections'));
app.use('/api/enrollments', require('./routes/api/adminEtc/enrollments'));
app.use('/api/survey', require('./routes/api/adminEtc/survey'));
app.use("/api/chatbot", require("./routes/api/adminEtc/chatbot"));
app.use("/api/adminFaculty", require("./routes/api/adminEtc/faculty"));
app.use("/api/studentprofile", require("./routes/api/adminEtc/studentprofile"));

//Faculty center routes
app.use("/api/faculty", require("./routes/api/facultysc/faculty"));
// app.use("/api/admin", require("./Faculty Self Center/routes/api/admin"));
app.use("/api/facultyAuth", require("./routes/api/facultysc/auth"));
app.use("/api/profile", require("./routes/api/facultysc/profile"));
app.use("/api/calendar", require("./routes/api/facultysc/calendarEvent"));
app.use('/api/facultySurvey', require('./routes/api/facultysc/survey'));


//Serve static assets in production

if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*' , (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client' , 'build' , 'index.html'));
    })
}

const PORT = process.env.PORT || 5500;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
