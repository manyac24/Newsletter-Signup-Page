//jshint esversion: 6
const express = require("express")
const bodyParser=require("body-parser")
const request = require("request")
const https=require("https")


const app= express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
res.sendFile(__dirname + "/signup.html")
})
app.post("/",function(req,res){
  var firstName=req.body.fname
  var lastName=req.body.lname
  var mail=req.body.mail
  console.log(firstName,lastName,mail)

  var data={
      members: [
          {
              email_address:mail,
              status:"subscribed",
              merge_fields:{
                  FNAME:firstName,
                  LNAME:lastName
              }
            }
        ]
    }
    const jsonData=JSON.stringify(data)
const url=" https://us14.api.mailchimp.com/3.0/lists/86f8455929"
const options={
method:"POST",
auth:"manyachandna2122@gmail.com:863e25780bccd807098fd6753161461f-us14"
}

  const request=  https.request(url,options,function(response){

    if(response.statusCode==200)
     res.sendFile(__dirname+"/success.html")
     else
     res.sendFile(__dirname+"/failure.html")
    response.on("data",function(data){
    const dat=JSON.parse(data)
    console.log(dat)
})

    })
    request.write(jsonData)
    request.end();
}); 

     app.post("/failure",function(req,res){
         res.redirect("/")
     })     

app.listen(3000,function() {
 console.log ("server is running")
}
)
//api key
//863e25780bccd807098fd6753161461f-us14

// list Id
 //86f8455929.