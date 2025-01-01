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
    const papers = database.collection("papers");
    const mcqs = database.collection("mcqs");
    const videos = database.collection("videos");
    const academicsCurriculum = database.collection("academics");
    
    /*
      Authentication API (Admin,Student)
    
    */

    //post student data
    app.post('/api/students/register', async (req, res) => {

      try{

        const student = req.body;
        const userPhone = await users.findOne({ mobile: student.mobile });
        if (userPhone) {
            return res.status(400).json({ message: "Phone number already exists" });
        }
        //check email
        const userEmail = await users.findOne({ email: student.email });
        if (userEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        //CreatedAt
        student.createdAt = new Date();
        if(student.enrollmentStatus == "unenrolled"){
          student.enrollmentStatus = "Unenrolled";
        }
        student.enrollmentStatus = "enrolled";
        const result = await users.insertOne(student);
        res.send(result);

      }
      catch(error){
        res.status(500).send({ error: 'Internal Server Error' });
      }
        
    });

    //get all students data
    app.get('/api/students', async (req, res) => {
        const cursor = users.find({});
        const result = await cursor.toArray();
        res.send(result);
    });

    

  //filter student data by field

  app.get('/api/students/filter/:field/:value', async (req, res) => {
    const field = req.params.field;
    console.log(field);
    const value = req.params.value;
    console.log(value);
    const query = { [field]: value };
    const cursor = users.find(query);
    const result = await cursor.toArray();
    res.send(result);
  })

  //search student by any field
  app.post('/api/student/search', async (req, res) => {
    const search = req.body;
    const cursor = users.find(search);
    const result = await cursor.toArray();
    res.send(result);
  });

  //delete student data by id
  app.delete('/api/students/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await users.deleteOne(query);
      res.send(result);
    }
    catch(error){
      res.status(500).send({ error: 'Internal Server Error' });
    }
  })

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
      try {
        const id = req.params.id;
        const updatedStudent = req.body;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
            $set: updatedStudent,
        };
        const options = { upsert: true };
        const result = await users.updateOne(filter, updatedDoc, options);
        res.send(result);
      }
      catch(error){
        res.status(500).send({ error: 'Internal Server Error' });
      }
      
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
      curriculum.createdBy = "Admin";
      curriculum.updatedBy = "Admin";
      const result = await academicsCurriculum.insertOne(curriculum);
      res.status(201).send(result);
    } 
    catch (error) {
      console.error('Error inserting curriculum:', error);
      res.status(500).send({ error: 'Failed to insert curriculum' });
    }
  });

  //get all curriculum
  app.get('/api/curriculum', async (req, res) => {
    try{
      const cursor = academicsCurriculum.find({});
      const result = await cursor.toArray();
      res.send(result);
    }
    catch(error){
      console.error('Error getting curriculum:', error);
      res.status(500).send({ error: 'Failed to get curriculum' });
    }
  });

  //update curriculum by id
  app.put('/api/curriculum/:id', async (req, res) => {

    try{
      const id = req.params.id;
      const updatedCurriculum = req.body;
      //updated by
      updatedCurriculum.updatedBy = "Admin";
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
          $set: updatedCurriculum,
      };
      const options = { upsert: true };
      const result = await academicsCurriculum.updateOne(filter, updatedDoc, options);
      res.send(result);
    }
    catch(error){
      console.error('Error updating curriculum:', error);
      res.status(500).send({ error: 'Failed to update curriculum' });
    }
  });

  //delete curriculum by id
  app.delete('/api/curriculum/:id', async (req, res) => {
    try{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await academicsCurriculum.deleteOne(query);
      res.send(result);
    }
    catch(error){
      console.error('Error deleting curriculum:', error);
      res.status(500).send({ error: 'Failed to delete curriculum' });
    }
  });

  app.post('/api/subjects', async (req, res) => {
    const { curriculum, levels } = req.body;
  
    try {
      // Find the curriculum
      const existingCurriculum = await academicsCurriculum.findOne({ curriculum });
      
      if (!existingCurriculum) {
        return res.status(404).send({ message: 'Curriculum not found' });
      }
  
      // Iterate over levels to find and update the level in the curriculum
      for (const levelObj of levels) {
        const { level, subjects } = levelObj;
  
        // Find the level in the curriculum
        const curriculumLevel = existingCurriculum.levels.find(l => l.level === level);
  
        if (!curriculumLevel) {
          return res.status(404).send({ message: `Level ${level} not found in the selected curriculum` });
        }
  
        // Add the new subject to the subjects array of the level
        curriculumLevel.subjects.push(...subjects); // Add all new subjects
  
        // Update the curriculum in the database
        const filter = { _id: existingCurriculum._id, "levels.level": level };
        const update = {
          $set: { "levels.$.subjects": curriculumLevel.subjects },
          $set: { modifiedBy: req.body.modifiedBy || 'Admin' } // Set modifiedBy if provided
        };
  
        const result = await academicsCurriculum.updateOne(filter, update);
  
        if (result.matchedCount === 0) {
          return res.status(500).send({ message: "Failed to add subject" });
        }
      }
  
      res.status(201).send({ message: "Subject added successfully", curriculum: existingCurriculum });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred while adding the subject" });
    }
  });


  //add chapter to subject

  app.put('/api/curriculum/subject/chapter/:id', async (req, res) => {
    const id = req.params.id;
    const chapter = req.body;
    const filter = { "subjects._id": new ObjectId(id) };
    const updatedDoc = {
        $push: { "subjects.$.chapters": chapter },
    };
    const options = { upsert: true };
    const result = await academicsCurriculum.updateOne(filter, updatedDoc, options);
    res.send(result);
  });

  // POST route to add a new chapter
app.post('/api/chapters', (req, res) => {
  const { curriculum, level, subject, chapterName, createdBy, modifiedBy } = req.body;

  if (!curriculum || !level || !subject || !chapterName || !createdBy || !modifiedBy) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newChapter = {
    id: chapters.length + 1,
    curriculum,
    level,
    subject,
    chapterName,
    createdBy,
    modifiedBy,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  chapters.push(newChapter);
  res.status(201).json(newChapter);
});


  /*
  
  Notes API using Google Drive API
  
  */

  //google drive api
 // Google service account configuration using environment variables



  
// app.post("/api/upload", upload.any(), async (req, res) => {
//   try {
//       console.log(req.body);
//       console.log(req.files);
//       const { subject, chapter } = req.body;
//       const { files } = req;

//       for (let f = 0; f < files.length; f += 1) {
//           const uploadedFile = await uploadFile(files[f]);
          
//           const fileMetadata = {
//               curriculum: req.body.curriculum,
//               level: req.body.level,
//               subject: subject,
//               chapter: chapter,
//               fileName: uploadedFile.name,
//               fileId: uploadedFile.id,
//               filePath: `https://drive.google.com/file/d/${uploadedFile.id}/view?usp=sharing`,
//               uploadedAt: new Date()
//           };
//           await saveFileMetadata(fileMetadata);
//       }

//       // Send a JSON response
//       res.status(200).json({ message: "Form Submitted" });
//       console.log("Form Submitted");
//   } catch (f) {
//       console.error(f);
//       res.status(500).send(f.message);
//   }
// });


app.post("/api/paper/upload", upload.any(), async (req, res) => {
  try {
      console.log(req.body);
      console.log(req.files);
      const { subject, chapter } = req.body;
      const { files } = req;

      for (let f = 0; f < files.length; f += 1) {
          const uploadedFile = await uploadFile(files[f]);
          
          const fileMetadata = {
              curriculum: req.body.curriculum,
              level: req.body.level,
              subject: subject,
              chapter: chapter,
              fileName: uploadedFile.name,
              fileId: uploadedFile.id,
              filePath: `https://drive.google.com/file/d/${uploadedFile.id}/view?usp=sharing`,
              uploadedAt: new Date()
          };
          await savePaperMetadata(fileMetadata);
      }

      // Send a JSON response
      res.status(200).json({ message: "Form Submitted" });
      console.log("Form Submitted");
  } catch (f) {
      console.error(f);
      res.status(500).send(f.message);
  }
});

app.get("/api/papers", async (req, res) => {
  const cursor = papers.find({});
  const result = await cursor.toArray();
  res.send(result);
})


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



const savePaperMetadata = async (fileMetadata) => {
  try {
      const result = await papers.insertOne(fileMetadata);
      console.log("File metadata saved to MongoDB:", result.insertedId);
  } catch (error) {
      console.error("Error saving file metadata to MongoDB:", error);
  }
};

//save mcqs metadata
const saveMcqsMetadata = async (fileMetadata) => {
  try {
      const result = await mcqs.insertOne(fileMetadata);
      console.log("File metadata saved to MongoDB:", result.insertedId);
  } catch (error) {
      console.error("Error saving file metadata to MongoDB:", error);
  }
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

    app.delete('/api/notes/delete/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
    
        // Find the note by its ID
        const note = await notes.findOne(query);
        if (!note) {
          return res.status(404).send({ error: 'Note not found' });
        }
    
        // Delete the file from Google Drive
        const drive = google.drive({ version: "v3", auth }); // Ensure 'auth' is properly configured
        try {
          await drive.files.delete({
            fileId: note.fileId,
          });
          console.log(`File ${note.fileId} deleted from Google Drive.`);
        } catch (googleError) {
          console.error('Error deleting file from Google Drive:', googleError.message);
          return res.status(500).send({ error: 'Failed to delete file from Google Drive' });
        }
    
        // Delete the note from MongoDB
        const result = await notes.deleteOne(query);
        if (result.deletedCount === 0) {
          return res.status(404).send({ error: 'Note not found for deletion' });
        }
    
        res.send({ success: true, message: 'Note and associated file deleted successfully' });
      } catch (error) {
        console.error('Error deleting note:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });


    app.delete('/api/paper/delete/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
    
        // Find the note by its ID
        const paper = await papers.findOne(query);
        if (!paper) {
          return res.status(404).send({ error: 'Paper not found' });
        }
    
        // Delete the file from Google Drive
        const drive = google.drive({ version: "v3", auth }); // Ensure 'auth' is properly configured
        try {
          await drive.files.delete({
            fileId: paper.fileId,
          });
          console.log(`File ${paper.fileId} deleted from Google Drive.`);
        } catch (googleError) {
          console.error('Error deleting file from Google Drive:', googleError.message);
          return res.status(500).send({ error: 'Failed to delete file from Google Drive' });
        }
    
        // Delete the note from MongoDB
        const result = await papers.deleteOne(query);
        if (result.deletedCount === 0) {
          return res.status(404).send({ error: 'Note not found for deletion' });
        }
    
        res.send({ success: true, message: 'Note and associated file deleted successfully' });
      } catch (error) {
        console.error('Error deleting note:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });



  /*
    Notes API END

  */ 

    /*
     * Recored Videos API
     */

    //post video data
    app.post('/api/videos/create', async (req, res) => {

      try{
        const video = req.body;
        video.createdAt = new Date();
        const result = await videos.insertOne(video);
        res.send(result);
      }
      catch(error){
        console.error('Error inserting video:', error);
      }
    });

    //get all videos
    app.get('/api/videos', async (req, res) => {

      try{
        const cursor = videos.find({});
        const result = await cursor.toArray();
        res.send(result);
      }
      catch(error){
        console.error('Error getting videos:', error);
      }

      
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
    app.delete('/api/videos/delete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await videos.deleteOne(query);
      res.send(result);
    });

    /*
     * Recored Videos API END
     */

    /**
     * Upload Past Papers on S3 Bucket
     */

    //upload file to aws s3 bucket
//   const uploadFileToS3 = (fileObject) => {
//   const AWS = require("aws-sdk");
//   const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   });

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: fileObject.originalname, // Use the original filename
//     Body: fileObject.buffer, // Use the buffer from multer
//   };

//   return new Promise((resolve, reject) => {
//     s3.upload(params, (err, data) => {
//       if (err) {
//         reject(err); // Reject the Promise on error
//       } else {
//         console.log(`File uploaded successfully. ${data.Location}`);
//         resolve(data); // Resolve the Promise with the data
//       }
//     });
//   });
// };

// Configure AWS S3
const multerS3 = require("multer-s3");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


// Multer configuration for memory storage
const storage = multer.memoryStorage(); // Store files in memory
const uploadPastPaper = multer({ storage: storage });
const uploadMcqs = multer({ storage: storage });

// Helper function to upload a single file to S3
const uploadFileToS3 = async (file, folderPath) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folderPath}/${Date.now()}_${file.originalname}`, // Unique key for the file
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    return {
      success: true,
      fileLocation: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error };
  }
};

// API route for uploading multiple files
app.post(
  "/api/paper/aws/upload",
  uploadPastPaper.array("files", 70), // Accept up to 70 files at a time
  async (req, res) => {
    try {
      const { curriculum, level, subject, folderName } = req.body;

      // Validate required fields
      if (!curriculum || !level || !subject || !folderName || !req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Missing required fields or no files uploaded." });
      }

      // Build the S3 folder path
      const folderPath = `${curriculum}/${level}/${subject}/${folderName}`;
      const uploadResults = [];

      // Upload each file to the S3 bucket
      for (const file of req.files) {
        const result = await uploadFileToS3(file, folderPath);
        uploadResults.push(result);
      }

      // Check for any errors during file uploads
      const failedUploads = uploadResults.filter((result) => !result.success);
      if (failedUploads.length > 0) {
        return res.status(500).json({
          message: "Some files failed to upload.",
          failed: failedUploads,
        });
      }

      // Save metadata to the database for each file
      for (let i = 0; i < req.files.length; i++) {
        const uploadedFile = req.files[i];
        const fileLocation = uploadResults[i].fileLocation;

        const fileMetadata = {
          curriculum,
          level,
          subject,
          folderName,
          fileName: uploadedFile.originalname,
          filePath: fileLocation,
          uploadedAt: new Date(),
        };

        // Save to the database
        await savePaperMetadata(fileMetadata);
      }

      // Return success response
      res.status(200).json({
        message: "Files uploaded successfully!",
        uploadedFiles: uploadResults.map((result) => result.fileLocation),
      });
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

//get all mcqs
app.get('/api/mcqs', async (req, res) => {
  const cursor = mcqs.find({});
  const result = await cursor.toArray();
  res.send(result);
})

const fs = require('fs');
const axios = require('axios');
const path = require('path');
const XLSX = require('xlsx');
const downloadFile = require('download'); // Or use a similar package to download the file.



const saveFileLocally = async (fileUrl, fileName) => {
  try {
    const localFilePath = path.join(__dirname, 'uploads', fileName);

    const writer = fs.createWriteStream(localFilePath);
    const response = await axios.get(fileUrl, { responseType: 'stream' });
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(localFilePath));
      writer.on('error', (error) => {
        console.error('File download error:', error.message);
        reject(error);
      });
    });
  } catch (error) {
    console.error('Failed to download file:', error.message);
    throw new Error('File download failed');
  }
};


const extractAnswersFromExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const answers = {};
  data.forEach((row) => {
    if (row[5] && row[6] && row[5] !== 'Question No.') {
      answers[row[5]] = row[6];
    }
  });

  return answers;
};

app.get('/fetch-answers', async (req, res) => {
  const { fileUrl } = req.query;
  console.log('Received fileUrl:', fileUrl);

  if (!fileUrl) {
    console.error('Missing fileUrl parameter');
    return res.status(400).json({ error: 'Missing fileUrl parameter' });
  }

  try {
    const fileName = path.basename(fileUrl);
    console.log('Extracted fileName:', fileName);

    const localFilePath = await saveFileLocally(fileUrl, fileName);
    console.log('File saved locally at:', localFilePath);

    const answers = extractAnswersFromExcel(localFilePath);
    console.log('Extracted answers:', answers);

    // Optionally clean up
    fs.unlinkSync(localFilePath);

    res.json(answers);
  } catch (error) {
    console.error('Error while processing file:', error.message);
    res.status(500).json({ error: 'Failed to fetch answers' });
  }
});





// API endpoint to fetch past paper metadata
app.get("/api/papers", async (req, res) => {
  try {
    const { curriculum, level, subject, year } = req.query;

    // Build the query based on filters
    const query = {};
    if (curriculum) query.curriculum = curriculum;
    if (level) query.level = level;
    if (subject) query.subject = subject;
    if (year) query.year = parseInt(year);

    // Fetch papers from the database
    const papers = await PastPaper.find(query);
    res.status(200).json(papers);
  } catch (error) {
    console.error("Error fetching past papers:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//API endpoint to upload multiple files mcqs
app.post("/api/mcqs/aws/upload", uploadMcqs.array("files", 70), async (req, res) => {
  
    try {
      const { curriculum, level, subject, year,session } = req.body;

      // Validate required fields
      if (!curriculum || !level || !subject || !year || !session || !req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Missing required fields or no files uploaded." });
      }

      console.log("uploading");

      // Build the S3 folder path
      const folderPath = `McqSolver/${curriculum}/${level}/${subject}/${year}/${session}`;
      const uploadResults = [];
      console.log("path : " + folderPath);

      // Upload each file to the S3 bucket
      for (const file of req.files) {
        console.log(file + "uploading");
        const result = await uploadFileToS3(file, folderPath);
        uploadResults.push(result);
      }

      // Check for any errors during file uploads
      const failedUploads = uploadResults.filter((result) => !result.success);
      if (failedUploads.length > 0) {
        return res.status(500).json({
          message: "Some files failed to upload.",
          failed: failedUploads,
        });
      }

      // Save metadata to the database for each file
      for (let i = 0; i < req.files.length; i++) {
        const uploadedFile = req.files[i];
        const fileLocation = uploadResults[i].fileLocation;

        const fileMetadata = {
          curriculum,
          level,
          subject,
          year,
          session,
          fileName: uploadedFile.originalname,
          filePath: fileLocation,
          uploadedAt: new Date(),
        };

        // Save to the database
        await saveMcqsMetadata(fileMetadata);
      }

      // Return success response
      res.status(200).json({
        message: "Files uploaded successfully!",
        uploadedFiles: uploadResults.map((result) => result.fileLocation),
      });
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  
})




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