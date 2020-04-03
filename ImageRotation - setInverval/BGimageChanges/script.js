var backgroundArr = ['Images/background1.jpg', 'Images/background2.jpg', 'Images/background3.jpg'];

//setting the variable for the background img to rotate. May not be necessary
var body =  document.querySelector("body");

// //      TIMER FOR RANDOM IMAGE ROTATION
// setInterval (function(){
//     body.style.backgroundImage = "url('"+ backgroundArr[Math.floor(Math.random()*backgroundArr.length)]+"')";
// }, 3000);

//creating a time to control image rotation
var timer = 0;

setInterval(function(){
    //condition for background image rotation
    if(timer<backgroundArr.length){
        //setting background image
        body.style.backgroundImage = "url('"+ backgroundArr[timer]+"')";
        //iteration for timer
        timer += 1;
    } else {
        //once timer reaches 3 (no index 3), timer resets thus reseting the image rotation       
        timer = 0;
    }
}, 3000);
