
require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();
app.use(cors());
app.use(express.json()); 

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'uploads/');
  },
  filename: (req, file, cb)=> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '_' + uniqueSuffix + ext);
  }
})

const upload = multer({
  storage: storage,
  limits: {fileSize: 3 * 1024 * 1024 }
})

const db = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
});

// Set up route to handle file uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ Status: 'Error', message: 'No file uploaded' });
  }

  const file = req.file;
  // Respond with file info, including URL or filename
  res.status(200).json({ Status: 'Success', file: { filename: file.filename } });
});


//****** users table ****************//

//create a new user (sign up)
app.post('/signup', (req, res) => {
  console.log('Request body:', req.body);
  const sql = "INSERT INTO USERS (`username`, `email`, `password`) VALUES (?, ?, ?)";
  const values = [
    req.body.username,
    req.body.email,
    req.body.password
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Database error:', err); 
      return res.json("Error");
    }
    console.log('Data inserted:', data); 
    return res.json(data);
  });
});


// User login
app.post('/login', (req, res) => {
  console.log('Request body:', req.body); 
  const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (data.length > 0) {
      // Assuming the user_id is in the first row of data
      const user = data[0];
      return res.json({
        success: true,
        user_id: user.user_id // Include user_id in the response
      });
    } else {
      return res.json({
        success: false,
        message: 'Invalid email or password' 
      });
    }
  });
});


//get user by id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE user_id = ?";
  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: "Database error" });
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
});


//Update the user details 
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log('Request body:', req.body); 
  const sql = "UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?";
  const values = [
    req.body.username,
    req.body.email,
    req.body.password,
    userId
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'User updated successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  });
});

// Delete user account
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log('Request body:', req.body);
  const sql = "DELETE FROM users WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  });
});

//************** events table  ************** */

// Function to convert ISO 8601 datetime to MySQL format
const convertToMySQLDateTime = (isoDate) => {
  const date = new Date(isoDate);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

// Event creation endpoint
app.post('/events', upload.single('image'), (req, res) => {
  console.log('Request body:', req.body); 
  console.log('Uploaded image:', req.file);

  // Extract data from request body
  const {
    title,
    description,
    price,
    location,
    is_free,
    categoryId,
    created_by,
    startDateTime,
    endDateTime,
    url
  } = req.body;

  // Convert ISO 8601 datetime to MySQL format
  const mysqlStartDateTime = convertToMySQLDateTime(startDateTime);
  const mysqlEndDateTime = convertToMySQLDateTime(endDateTime);

  //Get image url from the uploaded file
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  // SQL query to insert the event
  const sql = "INSERT INTO events (title, description, price, location, imageUrl, is_free, categoryId, created_by, startDateTime, endDateTime, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  // Values to be inserted
  const values = [
    title,
    description,
    price,
    location,
    imageUrl,
    is_free ? 1 : 0, 
    categoryId,
    created_by,
    mysqlStartDateTime,
    mysqlEndDateTime,
    url
  ];

  // Execute SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Data inserted:', result); 
    return res.status(201).json({ message: 'Event created', eventId: result.insertId });
  });
});


// Get all events
app.get('/events', (req, res) => {
  const sql = "SELECT * FROM events";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(200).json(results);
  });
});

// Get event by event_id
app.get('/events/:event_id', (req, res) => {
  const eventId = req.params.event_id;
  const sql = "SELECT * FROM events WHERE event_id = ?";
  db.query(sql, [eventId], (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length > 0) {
      return res.status(200).json(result[0]);
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  });
});

// Get events by user_id
app.get('/events/user/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const sql = "SELECT * FROM events WHERE created_by = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(200).json(results);
  });
});

// Get related events by categoryId
app.get('/events/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const sql = "SELECT * FROM events WHERE categoryId = ?";
  db.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(200).json(results);
  });
});

// Update event details
app.put('/events/:event_id', upload.single('image'), (req, res) => {
  const eventId = req.params.event_id;
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  // Extract data from request body
  const {
    title,
    description,
    price,
    location,
    is_free,
    categoryId,
    startDateTime,
    endDateTime,
    url
  } = req.body;

  // Convert ISO 8601 datetime to MySQL format
  const mysqlStartDateTime = convertToMySQLDateTime(startDateTime);
  const mysqlEndDateTime = convertToMySQLDateTime(endDateTime);

  // Get the image URL from the uploaded file
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  // SQL query to update the event
  const sql = "UPDATE events SET title = ?, description = ?, price = ?, location = ?, imageUrl = ?, is_free = ?, categoryId = ?, startDateTime = ?, endDateTime = ?, url = ? WHERE event_id = ?";
  
  // Values to be updated
  const values = [
    title,
    description,
    price,
    location,
    imageUrl,
    is_free ? 1 : 0,
    categoryId,
    mysqlStartDateTime,
    mysqlEndDateTime,
    url,
    eventId
  ];

  // Execute SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Event updated successfully' });
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  });
});

// Delete an event
app.delete('/events/:event_id', (req, res) => {
  const eventId = req.params.event_id;
  const sql = "DELETE FROM events WHERE event_id = ?";
  db.query(sql, [eventId], (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Event deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  });
});


//***************** category table ****************** */

// Create a new category
app.post('/categories', (req, res) => {
  console.log('Request body:', req.body); 
  const sql = "INSERT INTO category (cat_name) VALUES (?)";
  const values = [req.body.cat_name];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Data inserted:', result); 
    return res.status(201).json({ message: 'Category created', categoryId: result.insertId });
  });
});

// Get all categories
app.get('/categories', (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(200).json(results);
  });
});

// Fetch category name by ID
app.get('/categories/:id', (req, res) => {
  const categoryId = req.params.id;

  const query = 'SELECT cat_name FROM category WHERE id = ?';
  db.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error('Error fetching category name:', err);
      return res.status(500).json({ error: 'Failed to fetch category name' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ cat_name: results[0].cat_name });
  });
});

// Update category details
app.put('/categories/:id', (req, res) => {
  const categoryId = req.params.id;
  console.log('Request body:', req.body); 
  const sql = "UPDATE category SET cat_name = ? WHERE id = ?";
  const values = [req.body.cat_name, categoryId];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Category updated successfully' });
    } else {
      return res.status(404).json({ message: 'Category not found' });
    }
  });
});

// Delete a category
app.delete('/categories/:id', (req, res) => {
  const categoryId = req.params.id;
  const sql = "DELETE FROM category WHERE id = ?";
  db.query(sql, [categoryId], (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Category not found' });
    }
  });
});

//***************** orders table ******************* */

// Create a new order
app.post('/orders', (req, res) => {
  console.log('Request body:', req.body);
  const sql = "INSERT INTO orders (created_at, total_amt, event_id, user_id) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.created_at,
    req.body.total_amt,
    req.body.event_id,
    req.body.user_id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Data inserted:', result); 
    return res.status(201).json({ message: 'Order created', orderId: result.insertId });
  });
});

// Get order by event_id
app.get('/orders/event/:event_id', (req, res) => {
  const eventId = req.params.event_id;
  const sql = "SELECT * FROM orders WHERE event_id = ?";
  db.query(sql, [eventId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(200).json(results);
  });
});

// Get order by user_id
app.get('/orders/user/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const sql = "SELECT * FROM orders WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(200).json(results);
  });
});

// Delete an order by id
app.delete('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const sql = "DELETE FROM orders WHERE id = ?";
  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  });
});

app.listen(8001, () => {
  console.log("Listening yoo!");
});