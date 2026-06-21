import express from 'express';

import companies from "../data/companies.js";
import error from '../utilities/error.js'

//------------------Router Creation--------------
const router=express.Router();
//----------------------------------GET Request------------------------------------------------------------
//-------------------------http://localhost:3000/companies-------------------------------------
router.
     get("/",(req,res,next)=>{

  const industry=req.query.industry;
  let result =companies;
  if(industry)
  {
    result=result.filter(c=>c.industry.toLowerCase().includes(industry.toLowerCase()));


  }
   if(result.length===0)
   {
    return res.json([]);
   }
  res.json(result);



})

  .post("/",(req,res,next)=>{

     const{name,industry,location}=req.body;
     if(!name||!industry)
     {
        return next(error(400,"Data insufficient  to create a new company record "));
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
  const company=companies.find(c=>c.id===Number(req.params.id));
  if(!company)
    return next(error(404,"Company not found"));
res.json(company);

  })
//-----------------Patch request---------------------------
router.patch("/:id", (req, res, next) => {
  const company = companies.find(
    c => c.id === Number(req.params.id)
  );

  if (!company) {
    return next(error(404, "Company not found"));
  }

  const { name, industry, location } = req.body;

  if (name) company.name = name;
  if (industry) company.industry = industry;
  if (location) company.location = location;

  res.json(company);
});
  //---------------------------Delete Request--------http://localhost:3000/companies/:id-------------------------------


router.delete("/:id",(req,res,next)=>{
const index=companies.findIndex(c=>c.id===Number(req.params.id));
if(index===-1)
{
   return next(error(404,"No company found"));
}
const deletedComp=companies.splice(index,1);                 //delete 1 record at index;

res.json({message:"deleted successfully",deletedComp});
});
export default router;