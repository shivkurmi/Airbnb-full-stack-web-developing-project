const mongoose=require("mongoose");
const listing=require('../models/listing.js');
const initData=require('./data.js');
const mongoURL='mongodb://127.0.0.1:27017/projectShiv';
main().then((res)=>{
  console.log("DB is connected");
}).catch((err)=>{
  // console.log(err); 
});

async function  main() {
 await mongoose.connect(mongoURL)
}
const init = async ()=>{
await listing.deleteMany({});
initData.data=initData.data.map((obj)=>({  ...obj,  owner:"677d12a60481b327d29320fa"}));
console.log(initData.data);

listing.insertMany(initData.data);
console.log("data initialized");

}
init();