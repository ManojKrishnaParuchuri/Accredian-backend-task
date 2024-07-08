// server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4500;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'refer_db'
});

connection.connect(function(error) {
  if (error) {
    throw error;
  } else {
    console.log('Connected to database');
  }
});

// Endpoint to handle referral submissions
app.post('/api/loginuser', function(req, res) {
  const { refer_name, refer_mail, referee_name, referee_mail, refer_course } = req.body;

  // Insert data into MySQL database
  const query = 'INSERT INTO loginuser (refer_name, refer_mail, referee_name, referee_mail, refer_course) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [refer_name, refer_mail, referee_name, referee_mail, refer_course], function(error, results, fields) {
    if (error) {
      console.error('Error inserting referral:', error);
      res.status(500).send('Error inserting referral');
    } else {
      console.log('Referral inserted successfully');
      res.status(200).send('Referral inserted successfully');
    }
  });
});

// Endpoint to fetch all loginuser records
app.get('/api/getUser', function(req, res) {
  const query = 'SELECT * FROM loginuser';
  connection.query(query, function(error, results, fields) {
    if (error) {
      console.error('Error fetching loginuser records:', error);
      res.status(500).send('Error fetching loginuser records');
    } else {
      res.json(results); // Send the results as JSON response
    }
  });
});

app.use("/" ,(req,res) => {
  res.send("Server is running");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


