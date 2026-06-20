import express from 'express';
import ejs from 'ejs';
import companies from "../data/companies.js";
import error from '../utilities/error.js'

//------------------Router Creation--------------
const router=express.Router();
//----------------------------------GET Request------------------------------------------------------------
//-------------------------http://localhost:3000/companies-------------------------------------
router.
     get("/",(req,res,next)=>{

  const industry=req.query.id;
  let result =companies;
  if(industry)
  {
    result=result.filter(c=>c.industry.toLowerCase().includes(industry.toLowerCase()));


  }
   if(result.length===0)
   {
    return next(error(440,"Company not found"));
   }
  res.json(result);



})

  .post("/",(req,res,next)=>{

     const{name,industry,location}=req.body;
     if(!name||!industry)
     {
        return next(error(440,"Data insufficient  to create a new record "));
     }
     const newComp={
        id:Date.now(),
        name,
        industry,location:location||"None"




     };
     companies.push(newComp);
     res.status(201).json(newComp);


  });

  //--------------------------------------GET Request--------------------------------------------
  //--------------------------http://localhost:3000/companies/:id---------------------------------

  router.get("/:id",(req,res,next)=>{
  const company=companies.find(c.id===Number(req.params.id));
  if(!company)
    return next(error("Company not found"));
res.json(company);

  })


  //---------------------------Delete Request--------http://localhost:3000/companies/:id-------------------------------


router.delete("/:id",(req,res,next)=>{
const index=companies.findIndex(c=>c.id===Number(req.params.id));
if(index===-1)
{
   return next(error(404,"No company found"));
}
const deletedComp=applications.splice(index,1);                 //delete 1 record at index;

res.json(deletedComp);
});