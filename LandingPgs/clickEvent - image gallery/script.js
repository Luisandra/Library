var gallery = [
    //I have check the path on these by entering them into my HTML. The images appear
    'img/cookies.jpg',
    'img/chzCake.jpg',
    'img/cakeBall.jpg',
    'img/crepe.jpg',
    'img/gummy.jpg',
    'img/pie.jpg',
];

var prev = document.getElementById("previousButton");
var nxt = document.getElementById("nextButton");
var picture = document.querySelector("img");

var imgNum = 0;

function goForward (){
    if (imgNum<gallery.length-1){
        imgNum +=1;
        //******ERROR FILE NOT FOUND - UNSURE WHY
        //pulled this syntax from project 4 where it workedgit 
        picture.src = gallery[imgNum];
    } else {
        imgNum = 0;
        //iteration works - replace with code to change src
        picture.src = gallery[imgNum];;
    }
}

function goBack (){
    if (imgNum>0){
        imgNum -=1;
        //iteration works - replace with code to change src
        picture.src = gallery[imgNum];
    } else {
        imgNum = gallery.length-1;
        //iteration works - replace with code to change src
        picture.src = gallery[imgNum];
    }
}

//already checked eventlisteners are working
prev.addEventListener("click", goBack);
nxt.addEventListener("click", goForward);