import express from 'express';
import users from "../data/users.js";
import error from '../utilities/error.js'


//------------------Router Creation--------------
const router=express.Router();
//----------------------------------GET Request------------------------------------------------------------
//-------------------------http://localhost:3000/users-------------------------------------
router.
     get("/",(req,res,next)=>{

  
        res.json(users);



})
//---------------------------------------------post request-------http://localhost:3000/users-------------------------------------
  .post("/",(req,res,next)=>{
    if(!req.body.name||!req.body.username||!req.body.email){
        return next(error(404,"data insufficient"));
    }

     const newUser={
        id:users.length+1,
        name:req.body.name,
        username:req.body.username,
        email:req.body.email
     };
   

    users.push(newUser);
      res.status(201).json(newUser);
    })

//update user

.patch("/:id",(req,res,next)=>{
 
const  user=users.find(
    u=>u.id===Number(req.params.id)
);
if(!user){
    return next(error(404,"User not found"));
}
const allowed=["name","username","email"];
for (const u of allowed){
    if(req.body[u]){
        user[u]=req.body[u];
    }
}

res.json(user);

})


  

  //--------------------------------------GET Request--------------------------------------------
  //--------------------------http://localhost:3000/users/:id---------------------------------

  router.get("/:id",(req,res,next)=>{
  const user=users.find(u=>u.id===Number(req.params.id));
  if(!user){
    return next(error(404,"User not found"));}
    res.json(user);

  });


  //---------------------------Delete Request--------http://localhost:3000/users/:id-------------------------------


router.delete("/:id",(req,res,next)=>{
const index=users.findIndex(c=>c.id===Number(req.params.id));
if(index===-1)
{
   return next(error(404,"No User found"));
}
const deletedUser=users.splice(index,1);                 //delete 1 record at index;

res.json(deletedUser[0]);
});

export default router;