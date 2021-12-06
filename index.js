const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs"); 
const { Console } = require("console");
app.use(express.static("public"));
const port = 5000;
app.use(express.urlencoded({ extended: true }));
const jsonFile = "public/bookings.json";

app.get("/", (req, res) => {  
    res.sendFile(__dirname + "/public/HTML/Index.html");  
    console.log("app.get");
}); 
app.listen(port, () => {
    console.log("Kör servern på localhost:5000");
    });

app.get("/meny", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/meny.html"); 
});
app.get("/bord", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/bord.html"); 
});
app.post("/booked", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/bord.html"); 
    console.log("2");
    let name = req.body.name;
    let email = req.body.email;
    let tel = req.body.tel;
    let pax = req.body.pax;
    let comment = req.body.comment;
    let cal = req.body.cal;
           
    let booking = {        
        name,
        email,
        tel,
        pax,
        comment,
        cal,
    }   

    let readJsonFile = fs.readFileSync(jsonFile);
    let norm = JSON.parse(readJsonFile); 
    norm.push(booking);
    
    let newF = JSON.stringify(norm);
    fs.writeFile(jsonFile, newF, (err) => {
        if (err) throw err;
    });

    //res.send("<script>var timer = setTimeout(function() {window.location='http://localhost:5000/bord'}, 500);</script>");
});
app.get("/oppettider", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/oppettider.html"); 
});
app.get("/recensioner", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/recensioner.html"); 
});
