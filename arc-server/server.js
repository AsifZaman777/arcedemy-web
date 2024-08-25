const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app = express();
const jwt = require('jsonwebtoken');
const stream = require("stream");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const upload = multer();
const port = process.env.PORT || 5000;

//dotenv
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    const notes = database.collection("notes");
    
    //post student data
    app.post('/api/register', async (req, res) => {
        const student = req.body;
        //check phone number already exists or not
        const userPhone = await users.findOne({ phoneNumber: student.phoneNumber });
        if (userPhone) {
            return res.status(400).json({ message: "Phone number already exists" });
        }
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
          //login time
          const filter = { phoneNumber: phoneNumber };
          const updatedDoc = {
              $set: { lastLogin: new Date() }
          };
          const options = { upsert: true };
          console.log(updatedDoc);
          const result = await users.updateOne(filter, updatedDoc, options);  
          const token = jwt.sign({ phoneNumber: user.phoneNumber }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token,result });
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

  //forgot password
  app.put('/api/forgotpassword', async (req, res) => {
    const { phoneNumber, password } = req.body;
    const user = await users.findOne({ phoneNumber });
    if (user) {
        const filter = { phoneNumber: phoneNumber };
        const updatedDoc = {
            $set: { password: password , passwordChangedAt: new Date() }
        };
        const options = { upsert: true };
        const result = await users.updateOne(filter, updatedDoc, options);
        res.send(result);
    }
    else {
        res.status(401).json({ message: "Invalid phone number" });
    }
  });

  /*
  
  Notes API using Google Drive API
  
  */

  //google drive api
 // Google service account configuration using environment variables
const serviceAccount = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replacing \\n with actual newline character
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
};

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,  // Use the service account object instead of keyFile
  scopes: SCOPES,
});
  
  
  app.post("/api/upload", upload.any(), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
        const { subject, chapter } = req.body;  // Get additional data from req.body
        const { files } = req;

        for (let f = 0; f < files.length; f += 1) {
            const uploadedFile = await uploadFile(files[f]);
            
            // Construct the document to be stored in MongoDB
            const fileMetadata = {
                subject: "Maths",
                chapter: "Algebra",
                fileName: uploadedFile.name,
                fileId: uploadedFile.id,
                filePath: `https://drive.google.com/file/d/${uploadedFile.id}/view?usp=sharing`,  // Example Google Drive path
                uploadedAt: new Date()
            };
            await saveFileMetadata(fileMetadata);
        }

        res.status(200).send("Form Submitted");
        console.log("Form Submitted");
    } catch (f) {
        console.error(f);
        res.status(500).send(f.message);
    }
});

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);

    const { data } = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["1dvrIKRBWkUDE5C-h8Df-LG55Qqr-QgHL"],
        },
        fields: "id,name",
    });

    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data;  
};

const saveFileMetadata = async (fileMetadata) => {
    try {
        const result = await notes.insertOne(fileMetadata);
        console.log("File metadata saved to MongoDB:", result.insertedId);
    } catch (error) {
        console.error("Error saving file metadata to MongoDB:", error);
    }
};

  /*
    Notes API END

  */ 

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