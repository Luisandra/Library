

var text = 2;

function findIndexOf (checkFor) {
    var ArrOfObj = [
        {
            id: 1,
            description: "Call mom", 
            isComplete: false
        }, 
        {
            id: 2, 
            description: "Buy groceries",
            isComplete: false
        }, 
        {
            id: 3, 
            description: "Go to movies",
            isComplete: false   
        }
    ];
    let index = ArrOfObj.findIndex(i => i.id ===checkFor);
    return index;
}



//"i" is placeholder txt for each object in the array. 
//The function then checks for object.id (it can be any key name) and compares it to checkFor. 
//checkFor is hard coded, but could potentially come from anywhere
//findIndex returns the first instance of...
//this returns 1