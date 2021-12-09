const { Console } = require("console");
const express = require("express");
const app = express();
const fs = require("fs"); 
app.use(express.static("public"));
const port = 4000;
app.use(express.urlencoded({ extended: true }));
const jsonFile = "public/bookings.json";

app.get("/", (req, res) => {  
    res.sendFile(__dirname + "/public/HTML/Index.html");  
    console.log("app.get");
}); 
app.listen(port, () => {
    console.log(`Kör servern på localhost:${port}`);
    });

app.get("/meny", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/meny.html"); 
});
app.get("/bord", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/bord.html"); 
});
app.post("/booked", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/bord.html"); 
    const name = req.body.name;
    const email = req.body.email;
    const tel = req.body.tel;
    const pax = req.body.pax;
    const comment = req.body.comment;
    const cal = req.body.cal;
           
    let booking = {        
        name,
        email,
        tel,
        pax,
        comment,
        cal,
    }   
console.log('booking',booking);
    const readJsonFile = fs.readFileSync(jsonFile);
     let norm = JSON.parse(readJsonFile); // testa med tom fil "bookings.json" inge data 
    norm.push(booking);
    
    const newF = JSON.stringify(norm);
    fs.writeFile(jsonFile, newF, (err) => {
        if (err) throw err;
    });

});
app.get("/oppettider", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/oppettider.html"); 
});
app.get("/recensioner", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/recensioner.html"); 
});
app.get("/login", (req,res) => {
    res.sendFile(__dirname + "/public/HTML/login.html"); 
});
app.post("/login", (req,res) => {
    const name = req.body.name
    const password = req.body.password
    if (name === "VeganUs" && password === "lol123"){
        res.sendFile(__dirname + "/public/HTML/bookingList.html");
        console.log("Du är nu inloggad")
        
    }else {
        res.sendFile(__dirname + "/public/HTML/login.html"); 
        console.log("Inloggning misslyckad")
    }
});
app.get("/bookingList", (req, res) => {
    //res.sendFile(__dirname + "/public/HTML/bookingList.html"); 

fs.readFile("public/HTML/bookingList.html", function(err, htmlData) {
    fs.readFile("public/bookings.json", (err, textData) => {    
        if (err) throw err; // avbryt exekveringen om fel
        if(textData.toString()){

            let htmlText = htmlData.toString();
            let myText = ''
      
            JSON.parse(textData.toString()).forEach((item)=>{
                myText += `<tr><td>${item.name}</td><td>${item.email}</td><td>${item.tel}</td><td>${item.pax}</td><td>${item.comment}</td><td>${item.cal}</td></tr>`
            })
            
            
            let output = htmlText.replace(/Inga_Bokningar/, myText);
            // skicka till klienten
            res.send(output);
        }
    });
})
});