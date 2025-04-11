const express=require("express");
const router=express.Router();




router.get("/",(req,res)=>{
  res.send("post slash page")
});
router.get("/:id",(req,res)=>{
  res.send("post slash id  page")
});
router.post("/",(req,res)=>{
  res.send("post slash post page")
});
router.delete("/delete",(req,res)=>{
  res.send("user delete page page")
});


module.exports=router;