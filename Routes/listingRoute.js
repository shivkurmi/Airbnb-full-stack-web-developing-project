const express=require("express");
const warpError=require("../utils/wrapError.js");
const {isLogIn,isOwner}=require("../AuthenticationMiddleware.js");
const router=express.Router();
const controllerList=require("../controller/listingController.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


//Index
router.get("/",warpError(controllerList.indexList));

//createShow
  router.get("/new",isLogIn, controllerList.CreateShow);

  // create route
  // router.post("/",warpError(controllerList.creratePost));
  router.post("/",upload.single("list[image]"),(req,res)=>{
    console.log(req.file);
  })


  //Edit 
  router.get("/edit/:id",isLogIn,warpError(controllerList.editList ));


  //Update 
  router.patch("/:id",isLogIn,isOwner,warpError(controllerList.updateList));
  //Show Rote
  router.get("/:id" ,warpError(controllerList.showList));
  //Delete
  router.delete("/delete/:id",isOwner,controllerList.destroyList);
  
module.exports=router;