const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI =
  "mongodb+srv://praneshdn816:lm30atpsg@cluster0.lxvoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error("Error connecting to MongoDB:", e));

// Define the schema and model for messages
const msgschema = new mongoose.Schema(
  {
    name: String,
    email: String,
    msg: String,
  },
  { collection: "contact" } // Explicitly specify the collection name
);

const messagemodel = mongoose.model("Message", msgschema); // Corrected model definition

// POST endpoint to add a new message
app.post("/api/newmessage", async (req, res) => {
  const { name, email, msg } = req.body;

  // Validate input
  if (!name || !email || !msg) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newmsg = new messagemodel({ name, email, msg });
    await newmsg.save();
    res.status(201).json(newmsg); // 201 = Created
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Failed to add message" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));