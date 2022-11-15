const express = require('express'); 
const app = express();
const bodyParser=require('body-parser')
const port = process.env.PORT || 3001; 
const MongoClient=require('mongodb').MongoClient;
const { json } = require('body-parser');
var url = "mongodb://localhost:27017/client";
const axios =require('axios').default;
const multer =require('multer')
const nodemailer=require('nodemailer')




app.listen(port, () => console.log(`Hi mapla ${port}`));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// fse.copy('C:\\fakepath\\WhatsApp Image 2021-10-08 at 9.43.38 AM.jpeg', './images/WhatsApp Image 2021-10-08 at 9.43.38 AM.jpeg', err => {
//   if (err) return console.error(err)
//   console.log('success!')
// })



const storage =multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,'./component/images/');
  },
  filename:(req,file,callback)=>{
    callback(null,file.originalname);
  }

})

const upload=multer({storage:storage});
const up1=multer({storage:storage});

app.post('/ownerstore',upload.single('pic'), async(req,res)=>{
  let name=req.body.mail;
  let mob=req.body.picname;
  console.log(name);
  console.log(mob);

  MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo=db.db("client");
    var myObj={name :req.body.name ,phonenum:req.body.phnum,mail:req.body.mail,city:req.body.city,password:req.body.pass,profile:req.body.picname};
    dbo.collection("farmers").insertOne(myObj,function(err,res){
      if(err)throw err;
      console.log("jeichutom mara");
      db.close();
    });
  });
});

app.post('/farmerstore',upload.single('pic'), async(req,res)=>{
  let name=req.body.mail;
  let mob=req.body.picname;
  console.log(name);
  console.log(mob);

  MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo=db.db("client");
    var myObj={name :req.body.name ,phonenum:req.body.phnum,mail:req.body.mail,password:req.body.pass,profile:req.body.picname};
    dbo.collection("farmersDataStore").insertOne(myObj,function(err,res){
      if(err)throw err;
      console.log("jeichutom mara");
      db.close();
    });
  });
});



app.post('/loginpage',async(req,res)=>{

  console.log(req.body.mail);
  res.send({name:req.body.mail});


})



app.post('/getpics', async (req, res) => { 

  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    //Return only the "name" field in the result:
    var dbo = db.db("client");
    dbo.collection("ownersData").find({}, { projection: { _id: 1, imgName:1 ,status:1,mail:1,rent:1} }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});


app.post('/sendData', upload.single('picDict'),async(req,res)=>{
  let name=req.body.modelNo;
  let mob=req.body.rent;
  console.log(name);
  console.log(mob);

  MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo=db.db("client");
    var myObj={mail:req.body.mailId,modelName:req.body.vehicleName,modelNum:req.body.modelNo,imgName:req.body.imgName,status:req.body.status,rent:req.body.rent};
    dbo.collection("ownersData").insertOne(myObj,function(err,res){
      if(err)throw err;
      console.log("jeichutom mara!!!");
      db.close();
    });
  });
});

app.post('/getOwnersPics',async(req,res)=>{
  let mailId=req.body.mailId;
  let quey={mail:mailId};
  console.log(mailId);
  console.log(req.body)

  MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo=db.db("client");
    dbo.collection("ownersData").find(quey,{ projection: { _id: 1, imgName: 1,status:1,rent:1 } }).toArray(function(err,result){
      if(err)throw err;
      console.log(result);
      res.send(result);
      db.close();
    })
  })
  console.log("MAchan!!!");

})

app.post('/deletePics',async(req,res)=>{
  var imageName=req.body.imageName;

  MongoClient.connect(url,function(err,db){
    if(err)throw err;
    const dbo=db.db("client");
    var myquery = { imgName: imageName };
    dbo.collection("ownersData").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  })
})

app.post('/updataStatus',async(req,res)=>{
  console.log(req.body);

  MongoClient.connect(url,function(err,db){
    if (err) throw err;
    var dbo = db.db("client");
    var myquery = { imgName: req.body.imgName };
    var newvalues = { $set: {status: req.body.status } };
    dbo.collection("ownersData").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
});

app.post('/clientCheck',async(req,res)=>{
  console.log(req.body.mail);
  let mailId=req.body.mail;
  let quey={mail:mailId};

  MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo=db.db("client");
    dbo.collection("farmers").find(quey,{ projection: { _id: 0 } }).toArray(function(err,result){
      if(err)throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

app.post('/FarmerCheck',async(req,res)=>{
  console.log(req.body.mail);
  let mailId=req.body.mail;
  let quey={mail:mailId};

  MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo=db.db("client");
    dbo.collection("farmersDataStore").find(quey,{ projection: { _id: 0 } }).toArray(function(err,result){
      if(err)throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

app.post('/getVehModel',async(req,res)=>{
  console.log(req.body);

  MongoClient.connect(url,function(err,db){
    if (err) throw err;
    var dbo = db.db("client");
    var myquery = { imgName: req.body.imgName };
    dbo.collection("ownersData").find(myquery,{ projection: { _id: 0,modelName:1,modelNum:1,rent:1 } }).toArray(function(err,result){
      if(err)throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

app.post('/getOwnerDet',async(req,res)=>{
  console.log(req.body);

  MongoClient.connect(url,function(err,db){
    if (err) throw err;
    var dbo = db.db("client");
    var myquery = { mail: req.body.mail };
    dbo.collection("farmers").find(myquery,{ projection: { _id: 0,name:1,phonenum:1,city:1 } }).toArray(function(err,result){
      if(err)throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

app.post('/getOwnpicss',async(req,res)=>{
  console.log(req.body);

  MongoClient.connect(url,function(err,db){
    if (err) throw err;
    var dbo = db.db("client");
    var myquery = { mail: req.body.mail };
    dbo.collection("ownersData").find(myquery).toArray(function(err,result){
      if(err)throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

app.post('/sendMail',async(req,res)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',         //https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted refer this for smooth email!!!
    auth: {
      user: '20euec504@skcet.ac.in',
      pass: 'skcet504'//mpai@0000
    }
  });

  var mailOptions = {
    from: '20euec504@skcet.ac.in',//emedicwithai123@gmail.com
    to: req.body.Farmermail,
    subject: 'Your '+req.body.modelName+' has booked Successfully!!!',
    text: 'Hi '+ req.body.FarmerName+'..,\n '+'Hope you are doing Good!!! 😁💖💚. Your Order has Successfully placed.\n Here are some vehicles information:- \n Owners Name:  '+req.body.ownName+' \n Owners MobileNumber:  '+req.body.ownerMobile+' \n Vehicle Name:  '+req.body.modelName+' \n Model Number:  '+req.body.modelNo +' \n Vehicles Rent PerHour:  ₹'+req.body.rent+' \n Owner City:  '+req.body.ownCity+' \n\n Thank You for Ordering in our Rental-Management website!!! ',
  };

  var mailforOwners={
    from: '20euec504@skcet.ac.in',
    to: req.body.ownMail,
    subject:'Your '+req.body.modelName+' has booked by '+ req.body.FarmerName,
    text:'Hi '+req.body.ownName+' ..,\n'+'Hope you are doing Good!!! 😁💖💚. \n Here are some vehicles information:- \n Customer Name:   '+req.body.FarmerName+'\n Customer MobileNumber:   '+req.body.Farmermob+'\n Vehicle Model No:   '+req.body.modelNo+'\n Rent of the Vehicle:   ₹'+req.body.rent+'\n Hurry up !!!... and grab the customer. Thank You for using our Rental-Management wbsite...',
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })

  transporter.sendMail(mailforOwners,function(error,info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })

})