const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app = express();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

//dotenv
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@arcedemy.iv97u.mongodb.net/?retryWrites=true&w=majority&appName=Arcedemy`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("arcedemy");
    const users = database.collection("students");
    
    //post student data
    app.post('/api/register', async (req, res) => {
        const student = req.body;
        console.log("data : ",student);
        //CreatedAt
        student.createdAt = new Date();
        student.EnrollmentStatus = "Enrolled";
        const result = await users.insertOne(student);
        res.send(result);
    });

    //get all students data
    app.get('/api/students', async (req, res) => {
        const cursor = users.find({});
        const result = await cursor.toArray();
        res.send(result);
    });

    //get student data by id
    app.get('/api/students/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const student = await users.findOne(query);
      res.send(student);
  });

    //login using email and password and get token
    app.post('/api/login', async (req, res) => {
        const { phoneNumber, password } = req.body;
        const user = await users.findOne({ phoneNumber });
        if (user && user.password === password) {
            const token = jwt.sign({ phoneNumber: user.phoneNumber }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token });
        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    });

    //update student data by id
    app.put('/api/students/:id', async (req, res) => {
      const id = req.params.id;
      const updatedStudent = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
          $set: updatedStudent,
      };
      const options = { upsert: true };
      const result = await users.updateOne(filter, updatedDoc, options);
      res.send(result);
  });

    //delete student data by id
    app.delete('/api/students/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await users.deleteOne(query);
      res.send(result);
  });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Arcedemy server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});