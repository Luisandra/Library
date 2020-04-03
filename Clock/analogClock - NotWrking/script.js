function clock (){
    //calculate angel
    var curdate = new Date()
	var hour_as_degree = ( curdate.getHours() + curdate.getMinutes()/60 ) / 12 * 360
	var minute_as_degree = curdate.getMinutes() / 60 * 360
	var second_as_degree = ( curdate.getSeconds() + curdate.getMilliseconds()/1000 ) /60 * 360
	$hands.filter('.hr').css({transform: 'rotate(' + hour_as_degree + 'deg)' })
	$hands.filter('.min').css({transform: 'rotate(' + minute_as_degree + 'deg)' })
	$hands.filter('.sec').css({transform: 'rotate(' + second_as_degree + 'deg)' })
	requestAnimationFrame(updateclock)

}


//Code for digital clock
var clock = document.getElementById("time");
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
            // //change background color w/ every change in clock
            // bg.style.backgroundColor = colors[iteration];
            //array iteration to change to next element
            // if(iteration<colors.length){
            //     iteration++;
            // } else {
            //     //reset index when @ end of array
            //     iteration = 0;
            // }
}

function addZero(t){
    //add 0 if # are single digits
    if (t<10){
        t= "0"+t;
        return t;
    } 
    return t;
}
window.onload = clock;
//check time every second
setInterval(displayClock, 1000);
setInterval(clock, 1000);