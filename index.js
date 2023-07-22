import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config();

const __dirname=path.resolve();

// initializig the express by calling it
const app=express()

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',router);

// app.use(express.static(path.join(__dirname,"./client/build")));

// app.get('*',function(_,res){
//     res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
//         res.status(500).send(err);
//     });
// })

// Create an absolute path to the build directory
const buildPath = path.resolve(__dirname, 'client', 'build');

// Serve the static files from the build directory
app.use(express.static(buildPath));

// Catch-all route to serve the index.html file
app.get('*', function (req, res) {
  res.sendFile(path.resolve(buildPath, 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});


// creating express server
const PORT=process.env.PORT || 8000;
// listen function takes two arguments first one is port number and second one is a callback function which is used to perform some operation just after the server start
app.listen(PORT,()=>console.log(`Server started successfully! on port ${PORT}`));

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
const URL=process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@blogapp.4ubpqaw.mongodb.net/?retryWrites=true&w=majority`;

// Connection();
// pass username and password after env file is build
Connection(URL);