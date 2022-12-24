const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const vaccineCenters = [
  {
    name: "city center",
    slots: 20,
  },
  {
    name: "right town",
    slots: 20,
  },
  {
    name: "napier town",
    slots: 20,
  },
];
// home route
app
  .route("/")
  .get((req, res) => {
    let centers =[];
    vaccineCenters.map((center) => {
      return centers.push(center.name);
    });
    res.render("home", { centers: centers });
  })
  .post((req, res) => {
    let vaccineCenter = req.body.vaccineCenter;
    console.log(vaccineCenter);
  });

//login page route
app.get("/login", (req, res) => {
  res.render("login");
});
//create account route
app.get("/create", (req, res) => {
  res.render("create");
});
app.listen(port, () => {
  console.log("Server Started at port 3000");
});
