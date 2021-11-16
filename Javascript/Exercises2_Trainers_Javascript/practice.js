// for(let i = 0; i < 5; i++){  //exercise 1 
//     var btn = document.createElement('button');
//     btn.appendChild(document.createTextNode('Button ' + i));
//     btn.addEventListener('click', function(){
//         console.log(i);
//     });
//     document.body.appendChild(btn);
// }

//a. Clicking on button 4, the output will be "5". Var is a function scoped, because it is declared within a function. 
//b. We have to change the variable and declare it with "let".




// var globalVar = "abc"; //exercise 2 

// (function outerFunct(outerArg){
//     var outerVar = "x";

//     (function innerFunc(innerArg){
//         var innerVar = "y";

//     console.log(
//         "outerArg = " + outerArg + "\n" + //123
//         "innerArg = " + innerArg + "\n" + //456
//         "outerVar = " + outerVar + "\n" + //x
//         "innerVar = " + innerVar + "\n" + //y
//         "globalVar = " + globalVar); //abc
    
//     })(456);
// })(123);





// //exercise 3 
// console.log(1 < 2 < 3); //Interprets left to right: 1 < 2 = true(1), so becomes true(1) < 3, which is true. 
// console.log(3 > 2 > 1);//Interprets left to right: 3 > 2 = true(1), so becomes true(1) > 1, which is false.

// //True means 1.



// var fullname = "Alex K";  //exercise 4 
// var obj = {
//     fullname: 'Dan T',
//     prop: {
//         fullname: 'John R',
//         getFullname:function(){
//             return this.fullname;
//         }
//     }
// };
// console.log(obj.prop.getFullname());   //John R
// var test = obj.prop.getFullname; 
// console.log(test());   //Alex K

// //To print John R to the last console.log, we have to do next changes: 

// console.log(obj.prop.getFullname());   
// var test = obj.prop.getFullname(); 
// console.log(test);   




let dog = {
    name: 'doggo',
    sayName(){
        console.log(this.name);
    }
}

// let sayName = dog.sayName; //Incorrect form
// sayName();

let sayName = dog.sayName(); //Correct form
sayName;
