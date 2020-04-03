var clock = document.getElementById("clock");
var bg = document.querySelector("body");
var colors = ['#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'];
var iteration = 0;

//code to make clock pretty
clock.style.textAlign = "center";
clock.style.marginTop = "25%";
clock.style.color = "white";
clock.style.fontSize = "50px";



function displayClock(){
    //getting hours, minutes, seconds
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    //run function to add 0 in front of single digits
    m = addZero(m);
    s = addZero(s);    
    //display clock
    clock.innerHTML = h + ":" + m + ":" + s;
    //change background color w/ every change in clock
    bg.style.backgroundColor = colors[iteration];
    //array iteration to change to next element
    if(iteration<colors.length){
        iteration++;
    } else {
        //reset index when @ end of array
        iteration = 0;
    }
}

function addZero(t){
    //add 0 if # are single digits
    if (t<10){
        t= "0"+t;
        return t;
    } 
    return t;
}

//check time every second
setInterval(displayClock, 1000);
