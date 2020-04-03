const text = "xerox";
const text2 = "Racecar"


function isPalindrome(str) {
    //split string into array
    let str2 = str.toLowerCase().split("");
    //reverse and save as new variable
    str = str.toLowerCase().split("").reverse();
    //loop to compare variables
    for (var i=0; i<str.length; i++){
        if (str[i]!==str2[i]) {
            return false;
        }   
    }
    // else it is a palindrome
    return true; 
}

// invoke the isPalindrome function
console.log(isPalindrome(text2));

//One to work on -remove spaces, and continue w/ rest of code
const text3 = "madam im adam";