import express from 'express';
import error from "./utilities/error.js";
import ejs from 'ejs';
import errorMiddleware from "./middleware/error.js";
import methodOverride from 'method-override';                //to override the method using query value 
import users from './routes/users.js'
import companies from './routes/companies.js'



import applications from './routes/applications.js'

const app = express();
const port = 3000;

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));                           // to support delete and patch in dashboard ejs

// Logging Middleware
app.use((req, res, next) => {
  const time = new Date();

  console.log("Request Received");
    
  next();
});

//view engine

app.set("view engine","ejs");
app.use(express.static('public'));

//routes
app.use("/applications",applications);
app.use("/users",users);
app.use("/companies",companies);



//error handler
app.use(errorMiddleware);

app.listen(3000,()=>{
    console.log(`server running on ${port}`);
})