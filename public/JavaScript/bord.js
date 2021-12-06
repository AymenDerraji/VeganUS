myFunction = function () {      

    
    let request = new XMLHttpRequest(); //ny förfrågan
    request.open('GET', '../bookings.json', true);
    request.onload = function(){
        let data = JSON.parse(this.response);
        console.log("1");
        // for (let i = data.length -1; i >= 0; i--){
            
        //     const outName = document.createElement("p");
        //     outName.setAttribute("class","postN"); //postn är klassnamnrs
        //     outName.textContent = data[i].name;
        //     document.body.appendChild(outName);


            
        // }        
    }
    request.send();       
}