// server.js
// where your node app starts

// init project
const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definition des Blogs
const cors = require("cors");
app.use(cors());

const path = require("path");

app.set("views", path.join(__dirname, "blog"));
app.set("view engine", "ejs");

const matter = require('gray-matter');

//Alle Seiten auf HTTPS umleiten.
function checkHttps(req, res, next) {
  // protocol check, if http, redirect to https

  if (req.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    res.redirect("https://" + req.hostname + req.url);
  }
}

app.all("*", checkHttps);

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// Die statischen Seiten in public und content werden als "statisch" definiert. So können Sie direkt adressiert werden.
app.use(express.static("public"));
app.use(express.static("content"));
app.use(express.static("content/cms"));
app.use(express.static("assets"));

// This is the basic-routing
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});
// Routing der index.html als /index
app.get("/index", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});
// Routing der glitch.html als /glitch
app.get("/glitch", (request, response) => {
  response.sendFile(`${__dirname}/views/glitch.html`);
});
// Routing der links.html als /links
app.get("/links", (request, response) => {
  response.sendFile(`${__dirname}/views/links.html`);
});
// Routing der tipps.html als /tipps
app.get("/tipps", (request, response) => {
  response.sendFile(`${__dirname}/views/tipps.html`);
});
// Routing der bildergalerie.html als /bildergalerie
app.get("/bildergalerie", (request, response) => {
  response.sendFile(`${__dirname}/views/bildergalerie.html`);
});
// Routing der kontakt.html als /kontakt
app.get("/kontakt", (request, response) => {
  response.sendFile(`${__dirname}/views/kontakt.html`);
});
// Routing der kontakt.html als /impressum
app.get("/impressum", (request, response) => {
  response.sendFile(`${__dirname}/views/impressum.html`);
});

// My Blog
app.get("/blog", (req, res) => {
  const posts = fs.readdirSync(__dirname + '/blog').filter(file => file.endsWith('.md'));
  res.render("blog", {
    posts: posts
  });
});

app.get("/blog/:article", (req, res) => {
  
  const file = matter.read(__dirname + '/blog/' + req.params.article + '.md');
  console.log(file);
  
  console.log(req.params.article);
  var md = require("markdown-it")();
  let content = file.content;
  var result = md.render(content);
  
  res.render("index", {
    post: result,
    title: file.data.title,
    slug: req.params.article,
    description: file.data.description,
    image: file.data.image,
    date: file.data.date
  });
});

// The E-Mail-Transport initializing
const transporter = nodemailer.createTransport({
  host: "mail.gmx.net", //replace with your email provider - this is the host for google mail
  port: 587, // this port number is usally standard
  auth: {
    user: process.env.EMAIL, //This is your E-Mail-Address as environment variable -> see .env
    pass: process.env.PASS,  //This is your E-Mail-Password as environment variable -> see .env
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//Funktion für das Senden der E-Mail, hier werden alle Felder des Formulars mit den Daten "vorbereitet"
app.post("/send", (req, res) => {
  // Sendig the E-Mail
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //Hier wird die E-Mail an Euch definiert. Bitten halten Sie sich genau an der vorgegebenen Schreibweise, Info: \n ist ein Umbruch
    const mail1 = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Mail von der Website: ${data.reason}`,
      text: ` Name: ${data.fullname} \n E-Mail: <${data.email}> \n Nachricht: ${data.formmessage}`,
    };

    //Hier wird die E-Mail abgesendet
    transporter.sendMail(mail1, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
    
     //Hier wird die E-Mail an den Sender definiert, der eine Kopie seiner Nachricht erhält.
    const mail2 = {
      from: process.env.EMAIL,
      to: data.email,
      subject: `Ihre Mail von der Website: ${data.reason}`,
      text: ` Name: ${data.fullname} \n E-Mail: <${data.email}> \n Nachricht: ${data.formmessage}`,
    };

    //Hier wird die E-Mail abgesendet
    transporter.sendMail(mail2, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
    
    
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
