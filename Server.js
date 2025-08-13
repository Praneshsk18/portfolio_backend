const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({

}
));
app.use(bodyParser.json());

app.post("/api/newmessage", async (req, res) => {
  const { name, email, msg } = req.body;

  if (!name || !email || !msg) {
    return res.status(400).json({ error: "All fields are required" });
  }

      const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:"praneshsenthilkumar18@gmail.com",
        pass:"hvryilzjsajswzjn"
      }
    })

    const mailOptions = {
      from:email,
      to:"praneshsenthilkumar18@gmail.com",
      subject:`New Message from ${name}`,
      text:msg
    } 

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Failed to add message" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
