import express from 'express';
import applications from "../data/applications.js";
import users from "../data/users.js";
import companies from "../data/companies.js";
import error from '../utilities/error.js'

//------------------Router Creation--------------
const router=express.Router();
//----------------------------------GET All Request------------------------------------------------------------
//-------------------------http://localhost:3000/applications-------------------------------------

router.get("/",(req,res,next)=>{
 const status = req.query.status;
 const priority = req.query.priority;
 let result=applications;
 if(status)
 {
    result=result.filter(a=>a.status===status);
 }
if(priority)
 {
    result=result.filter(a=>a.priority===priority);
 }
 if(result.length===0)
 {
    return next(error(404,"Application not found"));
 }
res.json(result);

});
//-------------------------Dashboard-----------------------------------------------------
router.get("/dashboard", (req, res,next) => {
  res.render("dashboard", {
    applications,
    users,
    companies
  });
});

//--------------------http://localhost:3000/applications/:id ---------------------------
router.get("/:id",(req,res,next)=>{
 
   const application=applications.find(a=>a.id===Number(req.params.id));
   
   if(!application){
     return next(error(404,"Application not found"));
   
   }
   const user=users.find(u=>u.id===application.userId);
   const company=companies.find(c=>c.id===application.companyId);
   res.json({
      ...application,
      userName:user?user.name:"Unknown",
      companyName:company?company.name:"Unknown"
   });

});

//--------------------Regex Route---/applications/123  or /applications/id-123 or/applications/abc123-------------------------------------
router.get(/^\/(?:id-)?([a-zA-Z0-9]+)$/, (req, res, next) => {
  const id = Number(req.params[0]);
  const app = applications.find(a => a.id === id);
  if (!app) {
    return next(error(404, "Application not found"));
  }

  res.json({
    message: "Matched using REGEX route",
    data: app
  });
});

//-------------------------------Application Details View------------------------------------
router.get("/:id/view", (req, res, next) => {
  const app = applications.find(
    a => a.id === Number(req.params.id)
  );

  if (!app) {
    return next(error(404, "Application not found"));
  }

  const user = users.find(u => u.id === app.userId);
  const company = companies.find(c => c.id === app.companyId);

  res.render("applicationDetails", {
    app: {
      ...app,
      userName: user ? user.name : "Unknown",
      companyName: company ? company.name : "Unknown"
    }
  });
});


//------------------------------------POST Request------------------------------------------
//------------------------http://localhost:3000/applications-----------------------------------

router.post("/",(req,res,next)=>{
 const { userId,
        companyId,
        role,
        location,
        status,
        website,
        notes,
        priority}  = req.body;
if(!companyId||!role||!userId){
   return next(error(400,"Data Insufficient"));
}
const newApp=
{
          id:Date.now(),
         userId:Number(userId),
        companyId:Number(companyId),
        role,
        location:location || "",
        status:"applied",
        website:website ||"",
        notes:notes ||"",
        dateApplied:new Date().toISOString().split("T")[0],
        priority:priority||'normal'
}

applications.push(newApp);
res.status(201).json(newApp);


});

//------------------------------------patch--------------------------------------------
//-----------------------------------https://localhost:3000/applications/:id--------------
router.patch("/:id",(req,res,next)=>{
  
  const application=applications.find(a=>a.id===Number(req.params.id));
  if(!application)
  {
   return next(error(404,"Application not found"));
  }
  const {status,priority,notes}=req.body;
  if(status){
   application.status=status;
   
  }
  if(priority){
   application.priority=priority;
  }
if(notes){
   application.notes=notes;
}
res.json(application);
});

//------------------------------DELETE REQUEST------------------------------------------------
//----------------------------------http://localhost:3000/applications/:id---------------



router.delete("/:id",(req,res,next)=>{
const index=applications.findIndex(a=>a.id===Number(req.params.id));
if(index===-1)
{
   return next(error(404,"No Application found"));
}
const deletedApp=applications.splice(index,1);                 //delete 1 record at index;
res.json({message:"Deleted Successfully" ,deletedApp});




});




export default router;


