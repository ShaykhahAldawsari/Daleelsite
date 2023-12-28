const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  getSingleRecord,
  getRecords,
  deleteRecord,
  addRecord,
  editRecord,
  resetPassword,
  login
} = require("./controllers/controllers");

// Create an instance of Express app
const app = express();
const PORT = 5000;
const MONGODB_URL =
  "mongodb+srv://DaleelTeam:Daleel2023@cluster0.hhaeytx.mongodb.net/?retryWrites=true&w=majority";

//JSON parser built within express
app.use(express.json());
app.use(cors("*"));

//API routes responsibe for dealing with requests
app.get("/", (req, res) => {
  res.send("Welcome to Daleel Front");
});

app.get("/records", (req, res) => {
  getRecords(req, res);
});

app.get("/record", (req, res) => {
  getSingleRecord(req, res);
});

app.post("/record", (req, res) => {
  addRecord(req, res);
});

app.delete("/record", (req, res) => {
  deleteRecord(req, res);
});

app.put("/record", (req, res) => {
  editRecord(req, res);
});

//API routes responsibe for dealing with authentication
app.post("/auth/reset-password", (req, res) => {
  resetPassword(req, res);
});


app.post("/auth/login", (req, res) => {
  login(req, res);
});


app.post("/auth/verify", (req, res) => {
  login(req, res);
});



// Connect to MongoDB
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
