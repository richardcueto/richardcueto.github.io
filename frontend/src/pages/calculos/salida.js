//var
var hello = "mi mundo";
var casa = 1;
var booleno = false;
var myvar;
myvar = false;
//Array
var stringArray = ["item1", "item2", "item3"];
var numberArray = [1, 2, 3];
var booleanArray = [false, true, false];
var AnyArray = [1, 2, true, [], {}];
//tuple
var strNumTuple = ["hola", 2];
// //void,underfined,null
// let myVoid:void=undefined;
// let myNull:null=null;
// let myUnderfined:undefined=undefined;
//function
function getSuma(num1, num2) {
    return num1 + num2;
}
var mySub = function (num1, num2) {
    if (typeof (num1) === 'string') {
        num1 = parseInt(num1);
    }
    if (typeof (num2) === 'string') {
        num2 = parseInt(num2);
    }
    return num1 + num2;
};
var mihijo;
