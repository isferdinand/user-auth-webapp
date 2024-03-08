//Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const path = require('path');

app.use(express.json());
app.use(cors());

//Run server
app.listen(3002, () => {
  console.log('Server is running at port 3002');
});

//Create database(mysql)
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'users_db',
});

//Create a route to the server for registration

app.post('/register', (req, res) => {
  //Get variables sent from the form
  const sentRegNo = req.body.RegNo;
  const sentFullName = req.body.FullName;
  const sentPhoneNo = req.body.PhoneNo;
  const sentEmail = req.body.Email;
  const sentPassword = req.body.Password;

  //Create an SQL query to insert the data into the db
  const SQL =
    'INSERT INTO users (regno, fullName, phoneno, email, password) VALUES (?,?,?,?,?)';

  const Values = [
    sentRegNo,
    sentFullName,
    sentPhoneNo,
    sentEmail,
    sentPassword,
  ];

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log('User inserted successfully');
      res.send({ message: { message: 'User' } });
    }
  });
});

//Create a route to login with credentials the user registered
app.post('/login', (req, res) => {
  //Get variables sent from the form
  const sentLoginRegNo = req.body.LoginRegNo;
  const sentLoginPassword = req.body.LoginPassword;

  //Create an SQL statement to insert the data into the db
  const SQL = 'SELECT * FROM users WHERE regno = ? && password = ? ';

  const Values = [sentLoginRegNo, sentLoginPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send({ error: err });
    }
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send({ message: `Credentials don't match` });
    }
  });
});

app.post('/otp', (req, res) => {
  const sentEmail = req.body.Email;

  const SQL = 'SELECT * FROM users WHERE email = ?';
  const Value = [sentEmail];

  db.query(SQL, Value, (err, user) => {
    if (err) {
      res.send({ error: err });
    }
    if (!user) {
      res.send({ Status: `Email not found!` });
    }
    // if (results.length > 0) {
    //    res.send(results);
    //   console.log(results.Value);
    // } //else {
    //   res.send({ message: `Email not found!` });
    // }
    let emailLink = user[0].Email;
    const token = jwt.sign({ user: emailLink }, 'jwtSecretKey', {
      expiresIn: '1d',
    });

    const encodedToken = encodeURIComponent(token);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: 'EMAIL_USER',
      to: `${sentEmail}`,
      subject: 'Reset your password',
      text: `Click the link to reset your password. 
      http://localhost:5173/resetPassword/${emailLink}/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: `Success` });
      }
    });
  });
});

app.post('/resetPassword/:emailLink/:token', (req, res) => {
  const { emailLink, token } = req.params;
  const sentPasswdReset = req.body.PasswdReset;
  // const sentConfirmPasswd = req.body.ConfirmPasswd;

  jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
    if (err) {
      res.json({ Status: `Token Error` });
    } else {
      const SQL = 'UPDATE users SET password = ? WHERE email = ?';
      const Value = [sentPasswdReset, emailLink];

      db.query(SQL, Value, (err, results) => {
        if (err) {
          res.send({ error: err });
        }
        if (results) {
          res.send({ Status: `Success` });
        }
      });
    }
  });
});

//Production script
app.use(express.static('./client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
