const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs"); 
const { Console } = require("console");
app.use(express.static("public"));
const port = 5000;
app.use(express.urlencoded({ extended: true }));
const jsonFile = "public/JavaScript/bookings.json";

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
           
    let booking = {        
        name,
        email,
        tel,
        pax,
        comment,
    }   

    let readJsonFile = fs.readFileSync(jsonFile);
    let norm = JSON.parse(readJsonFile); 
    norm.push(booking);
    
    let newF = JSON.stringify(norm);
    fs.writeFile(jsonFile, newF, (err) => {
        if (err) throw err;
    });

    res.send("<html><body><p>Inlägg skickat!</p><p>Du skickas nu till startsidan</p><script>var timer = setTimeout(function() {window.location='http://localhost:3000/HTML/index.html'}, 3000);</script></body></html>");
});
app.get("/oppettider", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/oppettider.html"); 
});
app.get("/recensioner", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/recensioner.html"); 
});
