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
const bodyParser = require('body-parser');
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
    const videos = database.collection("videos");
    const academicsCurriculum = database.collection("academics");
    
    /*
      Authentication API (Admin,Student)
    
    */

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

  //search student by any field
  app.post('/api/search', async (req, res) => {
    const search = req.body;
    const cursor = users.find(search);
    const result = await cursor.toArray();
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
  Authentication API END (Admin,Student)
  */

  /**
   * Academics --> Curriculum, Subjects, Chapters
   */

  // Create curriculum
  app.post('/api/curriculum', async (req, res) => {
    try {
      const curriculum = req.body;
      curriculum.createdAt = new Date();
      const result = await academicsCurriculum.insertOne(curriculum);
      res.status(201).send(result);
    } catch (error) {
      console.error('Error inserting curriculum:', error);
      res.status(500).send({ error: 'Failed to insert curriculum' });
    }
  });

  //get all curriculum
  app.get('/api/curriculum', async (req, res) => {
    const cursor = academicsCurriculum.find({});
    const result = await cursor.toArray();
    res.send(result);
  });

  //update curriculum by id
  app.put('/api/curriculum/:id', async (req, res) => {
    const id = req.params.id;
    const updatedCurriculum = req.body;
    //updated by
    //updatedCurriculum.updatedBy = "Admin";
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
        $set: updatedCurriculum,
    };
    const options = { upsert: true };
    const result = await academicsCurriculum.updateOne(filter, updatedDoc, options);
    res.send(result);
  });

  //delete curriculum by id
  app.delete('/api/curriculum/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await academicsCurriculum.deleteOne(query);
    res.send(result);
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
                subject: subject,
                chapter: chapter,
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

app.put("/api/update/:id", upload.any(), async (req, res) => {
  const id = req.params.id;  
  const { subject, chapter } = req.body;  
  const { files } = req; 

  try {
      
      const note = await notes.findOne({ _id: new ObjectId(id) });
      if (!note) {
          return res.status(404).send("Note not found");
      }

      let updatedFileData;

      
      if (files && files.length > 0) {
          updatedFileData = await updateFile(files[0], note.fileId);  
      }

      // Update the document fields in MongoDB
      const updateFields = {
          subject: subject || note.subject,  
          chapter: chapter || note.chapter,  
          uploadedAt: new Date()  
      };

      if (updatedFileData) {
          updateFields.fileName = updatedFileData.name;
          updateFields.fileId = updatedFileData.id;
          updateFields.filePath = `https://drive.google.com/file/d/${updatedFileData.id}/view?usp=sharing`;
      }

     
      const result = await notes.updateOne(
          { _id: new ObjectId(id) },  
          { $set: updateFields }  
      );

      console.log("Note updated in MongoDB:", result);
      res.status(200).send("Note updated successfully");

  } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).send(error.message);
  }
});

// Function to update a file on Google Drive
const updateFile = async (fileObject, fileId) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);

  // Update the file on Google Drive
  const { data } = await google.drive({ version: "v3", auth }).files.update({
      fileId: fileId,  // Existing Google Drive file ID
      media: {
          mimeType: fileObject.mimetype,
          body: bufferStream,
      },
      fields: "id, name",
  });

  console.log(`Updated file ${data.name} ${data.id}`);
  return data;
};


    //get all notes
    app.get('/api/notes', async (req, res) => {
      const cursor = notes.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    //delete note by id
    app.delete('/api/notes/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await notes.deleteOne(query);
      res.send(result);
    });



  /*
    Notes API END

  */ 

    /*
     * Recored Videos API
     */

    //post video data
    app.post('/api/videos', async (req, res) => {
      const video = req.body;
      video.createdAt = new Date();
      const result = await videos.insertOne(video);
      res.send(result);
    });

    //get all videos
    app.get('/api/videos', async (req, res) => {
      const cursor = videos.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    //update video data by id
    app.put('/api/videos/:id', async (req, res) => {
      const id = req.params.id;
      const updatedVideo = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
          $set: updatedVideo,
      };
      const options = { upsert: true };
      const result = await videos.updateOne(filter, updatedDoc, options);
      res.send(result);
    });

    //delete video data by id
    app.delete('/api/videos/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await videos.deleteOne(query);
      res.send(result);
    });

    /*
     * Recored Videos API END
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