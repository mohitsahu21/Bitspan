const {
    getDataFromSizarPayClientApi
   } = require("../../APIS URL/sizarPayApis");
   const moment = require("moment-timezone");
   const { db } = require("../../connect");
 
   const sizarpayBalance = (req,res) =>{
     const endpoint = "/Balance";
    getDataFromSizarPayClientApi(endpoint,
     {
         
        "Format" : "1",
        "OutletID" : "999"
 
       }
    ).then((data)=>{
      res.json(data)
    }).catch((error)=>{
     res.status(500).send("Error fetching data from client API")
    })
   
   
   }
 
   module.exports = {
     sizarpayBalance
   };