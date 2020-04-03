let image = document.getElementById('pic');
image.setAttribute('src', "https://images.dog.ceo/breeds/pyrenees/n02111500_7655.jpg");

let btn = document.getElementById('btn');

let url = "https://dog.ceo/api/breeds/image/random"

btn.addEventListener("click", ()=>{
    fetch(url)
    .then((response)=>{
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })

    .then((data)=>{
        image.setAttribute('src', data.message);        
    })

    .catch((error)=>{
        console.error("Error in network", error);
        
        
    })

})