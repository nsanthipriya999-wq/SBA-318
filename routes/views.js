import express from 'express';

import applications from "../data/applications.js";
import companies from "../data/companies.js";
import error from '../utilities/error.js';
import users from "../data/users.js";

//------------------Router Creation--------------
const router=express.Router();
//----------------------------------GET Request------------------------------------------------------------
//-------------------------http://localhost:3000/dashboard------------------------------------

router.get("/",(req,res,next) => {
    res.render("dashboard",{
        applications,users,companies
    });
});


//---------stats view--------https://localhost:3000/stats/view----
router.get("/stats/view",(req,res) => {
    
    console.log("applications type:", typeof applications);
console.log("is array:", Array.isArray(applications));
    const total=applications.length;
    const applied= applications.filter(a => a.status==="applied").length;
     const interviewing= applications.filter(a => a.status==="interviewing").length;
      const rejected= applications.filter(a => a.status==="rejected").length;
       const offer= applications.filter(a => a.status==="offer").length;
  

       res.render("stats",{
        total,applied,interviewing,rejected,offer
       });
    });
export default router;