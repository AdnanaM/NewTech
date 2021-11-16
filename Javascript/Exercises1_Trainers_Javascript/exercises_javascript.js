function print(){  //exercise 1 
    var array1 = [
        [1, -2, 19, 24], 
        [18, 131, 7, 2], 
        [74, 10, 37, 2], 
        [3, 5, 8, 41],
        [23, 12, 6, 71]
    ]
    
    for(var i = 0; i < array1.length; i++){
        console.log(`Sub-array ${i} : ${array1[i]}`);
        for(var j = 0; j < array1[i].length; j++){
            console.log(array1[i][j]);
        }
    }
    
    var array2 = [
        [1, 0, 12, 4], 
        [-8, 121, 49, 64], 
        [17, 0, 7, 27], 
        [7, 4, 28, 14],
        [3, 10, 26, 7]
    ];
    for(var i = 0; i < array2.length; i++){
        console.log(`Sub-array ${i} : ${array2[i]}`);
        for(var j = 0; j < array2[i].length; j++){
            console.log(array2[i][j]);
        }
    }

    var array3 =[
        [1, 2, 1, 24], 
        [8, 111, 9, 4], 
        [7, 450, 67, 27], 
        [127, 4, 28,14], 
        [3, 10, 26, 7]
    ];
    for(var i = 0; i < array3.length; i++){
        console.log(`Sub-array ${i} : ${array3[i]}`);
        for(var j = 0; j < array3[i].length; j++){
            console.log(array3[i][j]);
        }
    }

    var array4 = [
        [1, 2, 1, 24], 
        [85, 511, 39, 47], 
        [34, 12, 77, 97], 
        [7, 4, 28,14], 
        [3, -10, 56, 7]
    ];
    for(var i = 0; i < array4.length; i++){
        console.log(`Sub-array ${i} : ${array4[i]}`);
        for(var j = 0; j < array4[i].length; j++){
            console.log(array4[i][j]);
        }
    }
}


// function sum(array){  //exercise 2 
//     var sum = 0;
//     for(var i = 0; i < array.length; i++){
//         sum = sum + array[i];
//     }
//     console.log(sum) 
// }

// function product(array){
//     var product = 1;
//     for(var i = 0; i < array.length; i++){
//         product = product * array[i]
//     }
//     console.log(product)
// }

// function firstArray(array, callback, callback2){
//     callback(array);
//     callback2(array)
// }

// firstArray([2, 3, 56, 7], sum, product);
// firstArray([1, 8, 5, 0], sum, product);
// firstArray([34, 6, 2, 7], sum, product);
// firstArray([1, 5, 8, 3], sum, product);




// function getLeapYears(start, middle, end){  //exercise 3
//     var leapYears = [];

//     while(start <= end){
//         if((start % 400 === 0) || (start % 100 !== 0) && ((start % 4) == 0)){
//             leapYears.push(start);
//         }
//         start ++;
//     }
//     return leapYears;
// }

// document.getElementById('leapYearsGroup1').innerText = "Leap years in the first range group (1900, 1967, 1999) are " + getLeapYears(1900, 1967, 1999) + ".";

// document.getElementById('leapYearsGroup2').innerText = "Leap years in the second range group (1950, 1967, 2000) are " + getLeapYears(1950, 1967, 2000) + ".";

// document.getElementById('leapYearsGroup3').innerText = "Leap years in the third range group (1980, 1973, 2019) are " + getLeapYears(1980, 1973, 2019) + ".";

// document.getElementById('leapYearsGroup4').innerText = "Leap years in the third range group (1989, 1990, 2012) are " + getLeapYears(1989, 1990, 2012) + ".";




// function lettersAlphabetical(word){  //exercise 4 
//     var arr = word.split('');
//     arr.sort();
//     return arr.sort()
// }
// console.log(lettersAlphabetical("function"));
// console.log(lettersAlphabetical("operator"));
// console.log(lettersAlphabetical("statement"));
// console.log(lettersAlphabetical("instruction"));



// function countVowels(word){  //exercise 5
//     var arr = word;
//     var counter = 0;
//     for(var i = 0; i < arr.length; i++){
//         if(arr[i] == "a" || arr[i] == "e" || arr[i] == "i" || arr[i] == "o" || arr[i] == "u"){
//             counter = counter + 1;
//         }
//     }
//     return counter;
// }
// alert("Alphabetical: The number of vowels is " + (countVowels("alphabetical")));
// alert("Planning: The number of vowels is " + (countVowels("planning")));
// alert("Disclosure: The number of vowels is " + (countVowels("disclosure")));
// alert("Development: The number of vowels is " + (countVowels("development")));



// function uniqueCharacters(word){  //exercise 6 
//     word = word.split('')
//     word = new Set(word)
//     word = [...word].join(" ");
//     return word;
// }
// document.getElementById('firstString').innerText = uniqueCharacters("release");
// document.getElementById('secondString').innerText = uniqueCharacters("integration");
// document.getElementById('thirdString').innerText = uniqueCharacters("testing");
// document.getElementById('fourthString').innerText = uniqueCharacters("repository");


// function showSignOfNumbers(){  //exercise 7
//     var x = -8; 
//     var y = 5;
//     var z = 2;
//     if(x > 0 && y > 0 && z > 0){
//         alert("The sign is + ");
//     }else if(x < 0 && y < 0 && z < 0){
//         alert("The sign is -");
//     }else if(x > 0 && y < 0 && z < 0){
//         alert("The sign is +");
//     }else if(x < 0 && y > 0 && z < 0){
//         alert("The sign is +");
//     }else if(x < 0 && y < 0 && z > 0){
//         alert("The sign is +");
//     }else{
//         alert("The sign is -")
//     }
// }



// function asteriscPattern(){  //exercise 8 
//     var str = "";
//     for(var i = 1; i <= 5; i++){
//         for(var j = 0; j < i; j++){
//             str+="*";
//         }
//         str+="\n"
//     }
//     document.getElementById('output').innerText = str;
// }


function asteriscPattern(){  //exercise 8.1
    var str = "";
    for(var i = 1; i <= 5; i++){
        for(var j = 1; j <= i; j++){
            str+=j;
        }
        str+="\n"
    }
    document.getElementById('output').innerText = str;
}


// function multiples(){  //exercise 9 
//     var sum = 0;
//     for(var i = 0; i < 100; i++){
//         if(i % 3 === 0 || i % 5 === 0){
//             sum += i;
//         }
//     }
//     return sum; 
// }
// console.log(multiples())


// var library = [
//     {
//     author: "Virginia Woolf",
//     title: 'The Waves',
//     readingStatus: true
//     },
//     {
//     author: 'Steve Jobs',
//     title: 'Walter Isaacson',
//     readingStatus: true
//     },
//     {
//     author: 'Suzanne Collins',
//     title: 'Mockingjay: The Final Book of The Hunger Games',
//     readingStatus: false
//     }
// ];

// library.forEach(library => {
//     for(let key in library){
//         console.log(`${key}:${library[key]}`);
//     }
// });



