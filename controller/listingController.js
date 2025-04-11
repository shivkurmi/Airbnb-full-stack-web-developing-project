const listing =require("../models/listing.js")
module.exports.indexList=async (req,res,next)=>{
  const allList= await listing.find();
  res.render("./listing/allList.ejs",{allList});
  };
  
  module.exports.CreateShow=(req,res,next)=>{
    res.render("./listing/create.ejs");
  };
  module.exports.creratePost=async (req,res,next)=>{
    if(! req.body.list){
      throw new ExpressError(401,"Invalid information entered");
    }
    let Listing=await new listing(req.body.list);
    Listing.owner=req.user._id;
    Listing.save();
    req.flash("success","New list created successfuly");
      res.redirect("/listing");    
  };

  module.exports.editList=async (req,res,next)=>{ 
      const {id}=req.params;
      const list=await listing.findById(id);
      res.render("./listing/Edit.ejs",{list});
    };

 module.exports.updateList=async (req,res,next)=>{
  const {id}=req.params;
  const listings=req.body.list;
  if(! req.body.list){
    throw new ExpressError(401,"Invalid information entered");
  }
   await listing.findByIdAndUpdate(id,{
    title:listings.title,
    description:listings.description,
    image:listings.image,
    price:listings.price,
    location:listings.location,
    country:listings.country
  });  
  res.redirect(`/listing/${id}`);
};

module.exports.showList=async (req,res,next)=>{
  const {id}=req.params;
  
  const parti=await listing.findById(id).populate("reviews").populate("owner");
  

  res.render("./listing/show.ejs",{parti});
};

module.exports.destroyList=async(req,res,next)=>{
  const {id}=req.params;
  await listing.findByIdAndDelete(id);
  res.redirect("/listing");
};