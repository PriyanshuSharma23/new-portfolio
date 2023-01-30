const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/test", (req, res) => {
  res.json({ msg: "Test route" });
});

app.post("/contact", (req, res) => {
  // setup nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  let email1 = transporter.sendMail({
    from: EMAIL,
    to: EMAIL,
    subject: "Contact Form",
    html: `
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `,
  });

  let email2 = transporter.sendMail({
    from: EMAIL,
    to: req.body.email,
    subject: "Contact Form",
    html: `
      <h3>Thank you for contacting us</h3>
      <p>We will get back to you soon</p>
    `,
  });

  Promise.all([email1, email2])
    .then(() => {
      res.json({ msg: "Emails sent" });
    })
    .catch((err) => {
      res.json({ msg: "Emails not sent" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
