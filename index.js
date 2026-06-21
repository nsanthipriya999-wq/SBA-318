import express from 'express';
import logger from "./middleware/logger.js"
import applications from "./data/applications.js";
import user from "./data/users.js";
import companies from "./data/companies.js";

//import error from "./utilities/error.js";
import ejs from 'ejs';
import errorMiddleware from "./middleware/error.js";
import methodOverride from 'method-override';                //to override the method using query value 
import usersR from './routes/users.js'
import companiesR from './routes/companies.js'
//import Chart from 'chart.js/auto'; //chart for bar chart



import applicationsR from './routes/applications.js'

const app = express();
const port = 3000;

// Parsing Middleware
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));                           // to support delete and patch in dashboard ejs

// Logging Middleware
/*app.use((req, res, next) => {
  const time = new Date();

  console.log("Request Received");
    
  next();
});*/

//view engine

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));

//routes
app.get("/test", (req, res) => {
  res.send("WORKING");
});
app.use("/applications",applicationsR);
app.use("/users",usersR);
app.use("/companies",companiesR);
app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    applications: applications,
    users:user,
    companies:companies,
    query: req.query || {}
  });
});
app.get("/stats/view", (req, res) => {
  const total = applications.length;
  const applied = applications.filter(a => a.status === "applied").length;
  const interviewing = applications.filter(a => a.status === "interviewing").length;
  const rejected = applications.filter(a => a.status === "rejected").length;
  const offer = applications.filter(a => a.status === "offer").length;

  res.render("stats", {
    total,
    applied,
    interviewing,
    rejected,
    offer
  });
});


//error handler
app.use(errorMiddleware);

app.listen(3000,()=>{
    console.log(`server running on ${port}`);
})