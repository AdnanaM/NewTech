// function checkDayAndTime(){   //exercise 1 
//     var timeNow = new Date();
//     var day = timeNow.getDay();
//     var seconds = timeNow.getSeconds();
//     if(seconds < 10){
//         seconds = "0" + seconds;
//     }
//     var minutes = timeNow.getMinutes();
//     if(minutes < 10){
//         minutes = "0" + minutes;
//     }
//     var hour = timeNow.getHours();
//     if(hour <= 12){
//         hour = hour + " " + "AM";
//     }else{
//         hour = hour + " " + "PM"
//     }

//     var dayList = ["Monday", "Tuesday", "Wednesday ","Thursday","Friday","Saturday"];
//     var today = `Today is : ${dayList[day]}`;
//     var time = `Current time is : ${hour} : ${minutes} : ${seconds}`;

//     document.getElementById("dayTime").innerText = today + "\n" + time;
// }



// function leapYear(year){  //exercise 2
//     if((year % 400 === 0) || (year % 100 !== 0) && ((year % 4) == 0)){
//         return year = "Leap Year";
//     }else{
//         return year = "Not Leap Year";
//     }
// }
// console.log(leapYear(1700)); // not a leap year
// console.log(leapYear(2000)); // leap year
// console.log(leapYear(1800)); // not a leap year



// for (let year = 2014; year <= 2050; year++){  //exercise 3 
//     let d = new Date(year, 0, 1);
//     if ( d.getDay() === 0 ){
//         console.log("1st January is being a Sunday  "+ year);
//     }
// }



// let random = Math.floor(Math.random() * 11)  //exercise 4 
// console.log(random);
// let number = parseInt(prompt("Write a number"));

// if(random === number){
//     console.log("Good Job");
// }else{
//     console.log("Not matched");
// }




// let now = new Date();  //exercise 5
// console.log(now);

// let chrismasDay = new Date(2021, 11, 25);
// console.log(chrismasDay);

// let calcDays = (d1, d2) => Math.floor(Math.abs(d1-d2)/(1000*60*60*24));
// let days = calcDays(now, chrismasDay);
// console.log(days);






// function multiply(){ //exercise 6
//     let number1 = parseInt(document.getElementById("firstNumber").value);
//     let number2 = parseInt(document.getElementById("secondNumber").value);
//     let multiplyNumbers = number1 * number2;
//     document.getElementById("result").innerText = "The result is " + multiplyNumbers;
// }

// function divide(){
//     let number1 = parseInt(document.getElementById("firstNumber").value);
//     let number2 = parseInt(document.getElementById("secondNumber").value);
//     let divideNumbers = number1 / number2;
//     document.getElementById("result").innerText = "The result is " + divideNumbers;
// }




// function difference(number){  //exercise 7 
//     let difference = number - 13;
//     if(number > 13){
//         return difference*2;
//     }else{
//         return Math.abs(difference);
//     }
// }
// console.log(difference(32)) //38
// console.log(difference(11)) //2



function cookingTime(eggs) {
    let time = 5;
    let maxEggs = 8;
    if(eggs / 8 == 0){
        return maxEggs + 1;
    }else{
        return time * 2;
    }
}
console.log(cookingTime(24));