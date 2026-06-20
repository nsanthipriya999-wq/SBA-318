import express from 'express';
import ejs from 'ejs';
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

     const user=users.find((u,i)=>u.id===Number(req.params.id));
    const i=users.findIndex(u=>u.id===Number(req.params.id));
    if(!user)
    {
      return next(error(404,"user not found"));
    }

    const allowed=["name","username","email"];
       for (const key of allowed) {
          if (req.body[key]){
          users[i][key] = req.body[key];
        }
        
      }
      res.json(user);
    })

  .delete("/",(req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id ===Number( req.params.id)) {
        users.splice(i, 1);
        return true;
      }
    });
 if (user) res.json(user);
    else next();
  });

  

  //--------------------------------------GET Request--------------------------------------------
  //--------------------------http://localhost:3000/users/:id---------------------------------

  router.get("/:id",(req,res,next)=>{
  const user=users.find(u.id===Number(req.params.id));
  if(!user)
    return next(error("User not found"));
res.json(user);

  })


  //---------------------------Delete Request--------http://localhost:3000/users/:id-------------------------------


router.delete("/:id",(req,res,next)=>{
const index=companies.findIndex(c=>c.id===Number(req.params.id));
if(index===-1)
{
   return next(error(404,"No company found"));
}
const deletedUser=users.splice(index,1);                 //delete 1 record at index;

res.json(deletedUser);
});

export default router;