var express = require("express")
let Covids = require('./CovidSchema')
let mongodbConnected=require('./MongodbConnect')
const cors = require('cors');
var app =express()
var bodyparser=require("body-parser")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors());
var os = require('os');
var Router = express.Router()


console.log("COVID",Covids)
app.get('/',function(req,res){
    
})
app.get('/about',function (req,res){
res.send("mongodb express React and mongoose app,React runs in another application")

console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());
console.log("Information: " + os.userInfo() );

Covids.countDocuments().exec()
 .then(count=>{
 console.log("Total documents Count :", count)

 }) .catch(err => {
 console.error(err)
 })

})

app.get('/alldata',function(req,res){
 Covids.find(function(err, alldata) {
 if (err) {
 console.log(err);
 } else {
 res.json(alldata);
 }
 });
 });


 app.get('/dateRecords',function(req,res){
  Covids.find(function(err, alldata) {
  if (err) {
  console.log(err);
  } else {
  res.json(alldata);
  }
  }).limit(20);
  });
    
/*
   app.post('/dateRecords', (req, res) =>{
    const dateRequested = req.body.date;
    const stateRequested = req.body.state;

    Covidcoll.find ( { $and: [ { state: { $eq: stateRequested } }, { date: { $eq: dateRequested } } ] }, (err, dateRecords) =>{
      if(err){
        console.log(err);
      } else{
        res.json(dateRequested);
      }
    }).limit(20);
  });
  */
 /*
     app.get('/dateRecords', (req, res) =>{
      const dateRequested = req.body.date;
      const stateRequested = req.body.state;

     Covids.find(
       {
       state: stateRequested,
       date: dateRequested
     }, (err, alldata) =>{
       if(err){
         console.log(err)
       } else{
         res.json(alldata);
       }
     }).limit(20);
  }); 
     */

app.get('/getdata/:id',function(req, res) {
 let id = req.params.id;
 Covids.findById(id, function(err, covid) {
 res.json(covid);
 });
 });

app.post('/adddata', function(req,res)
 {
 console.log("Ref",req.body)
 let newcovid = new Covids(req.body);
 console.log("newdata->",newcovid)
 newcovid.save()
 .then(todo => {
 res.status(200).json({'Covids': 'Data added successfully'});
 })
 .catch(err => {
 res.status(400).send('adding newcovid failed');
 });
})

app.post('/updatecovid/:id',function(req, res) {
 let id = req.params.id;
 let updatecovid = new Covids(req.body);
 console.log("update id",id,"newcovid->",updatecovid)

 Covids.findByIdAndUpdate(id,
 {
 date:updatecovid.date,
 county:updatecovid.county,
 state:updatecovid.state,
 cases:updatecovid.cases,
 deaths:updatecovid.deaths
 }
 ,
 function (err, docs) {
if (err){
console.log(err)
}
else{
 res.status(200).json({'covids': 'data updatedsuccessfully'});
}
 }

 )

});

app.post('/deleteCovid/:id',function(req, res) {
 let id = req.params.id;

 console.log("deleting")
 Covids.findByIdAndDelete(id,function (err, docs) {
 if (err){
 console.log(err)
 }
 else{
 res.status(200).send('Data Deleted');
 }
 }


 )

});
app.listen(5000,function(){
console.log("Server is running on the port 5000")
})
