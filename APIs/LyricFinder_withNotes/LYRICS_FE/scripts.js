let url = 'https://api.lyrics.ovh/v1';


function findLyrics(){
    //query dom to get value from input fields
    let artist = document.getElementById('artist');
    let title = document.getElementById('title');
    
    //add .value here to make it faster
    fetch(`${url}/${artist.value}/${title.value}`)
    //can also create variable w/ new URL to add to fetch instead of using template literals


    .then(function(response){
        if(!response.ok){
            throw Error;
        }
        return response.json()
    })
    .then(data => {
        //to ensure color is reset if error is first thrown (see styling below)
        displayLyrics.style.color = "black";
        //dont have to use query selector b/c it's the only one on pg
        //inner text will format words - inner html will not stylize
        displayLyrics.innerText = data.lyrics;
        //Reset Form
        artist.value = '';
        title.value = '';

    })
    .catch((error)=>{
        displayLyrics.style.color = "red";
        displayLyrics.innerText = 'Sorry, no lyrics found';
    })
}