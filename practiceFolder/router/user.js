const express=require("express");
const router=express.Router();


router.get("/",(req,res)=>{
  res.send("user slash page")
});
router.get("/:id",(req,res)=>{
  res.send("user slash id  page")
});
router.post("/",(req,res)=>{
  res.send("user slash post page")
});
router.delete("/delete",(req,res)=>{
  res.send("user delete page page")
});

module.exports=router;