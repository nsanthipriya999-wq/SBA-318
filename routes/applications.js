import express from 'express';
import ejs from 'ejs';
import applications from "../data/applications.js";
import error from '../utilities/error.js'

//------------------Router Creation--------------
const router=express.Router();
//----------------------------------GET Request------------------------------------------------------------
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

//--------------------http://localhost:3000/applications/:id ---------------------------
router.get("/:id",(req,res,next)=>{
 
   const application=applications.find(a=>a.id===Number(req.params.id));
   if(!application){
     return next(error(404,"Application not found"));
   
   }

  res.json(application);

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
        dateApplied,
        priority}  = req.body;
if(!companyId||role||userId){
   return next(error(404,"Data Insufficient"));
}
const newApp=
{
          id:Date.now(),
         userId:userId||1,
        companyId,
        role,
        location,
        status:"applied",
        website,
        notes,
        dateApplied:new Date().toISOString(),
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
   application.status===status;
   
  }
  if(priority){
   application.priority===priority;
  }
if(notes){
   application.notes===notes;
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
res.json(deletedApp);




});
export default router;


