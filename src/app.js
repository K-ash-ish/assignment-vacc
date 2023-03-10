const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const users = require("./users");
const createUser = require("./createUser");
const authStatus = require("./authStatus");
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
    let centers = [];
    vaccineCenters.map((center) => {
      return centers.push(center.name);
    });
    res.render("home", {
      centers: centers,
      authStatus: authStatus.login,
      authUser: authStatus.userName,
      isAdmin: authStatus.isAdmin,
    });
  })
  .post((req, res) => {
    let vaccineCenter = req.body.vaccineCenter;
  });

//login page route
app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    let userLogIn = {
      username: req.body.username,
      password: req.body.password,
    };
    let matchFound;
    users.map((user) => {
      if (user.username === userLogIn.username) {
        authStatus.login = true;
        authStatus.userName = user.username;
        if (user.isAdmin) {
          authStatus.isAdmin = true;
        }
      }
    });
    if (authStatus.login) {
      res.redirect("/");
    }
  });
app.get("/logout", (req, res) => {
  authStatus.login = false;
  authStatus.isAdmin = false;
  res.redirect("/");
});

// adding more centers
app
  .route("/add")
  .get((req, res) => {
    res.render("addcenter");
  })
  .post((req, res) => {
    let newCenter = {
      name: req.body.name,
      slots: req.body.slots,
    };
    vaccineCenters.push(newCenter);
    res.redirect("/");
  });

//create account route
app
  .route("/create")
  .get((req, res) => {
    res.render("create");
  })
  .post((req, res) => {
    let newUser = {
      username: req.body.username,
      password: req.body.password,
    };
    createUser(newUser);
    res.redirect("/");
  });
app.listen(port, () => {
  console.log("Server Started at port 3000");
});
