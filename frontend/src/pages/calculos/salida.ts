//var
var hello: string="mi mundo";
var casa:number=1;

var booleno:boolean =false;

var myvar:any;
myvar=false;

//Array
var stringArray:string[]=["item1","item2","item3"]
var numberArray:number[]=[1,2,3];
var booleanArray:boolean[]=[false,true,false];
var AnyArray:any[]=[1,2,true,[],{}];

//tuple
var strNumTuple:[string,number]=["hola",2];

// //void,underfined,null
// let myVoid:void=undefined;
// let myNull:null=null;
// let myUnderfined:undefined=undefined;

//function
function getSuma(num1:number,num2:number):number{
    return num1+num2;
}

let mySub=function(
    num1:number | string,
    num2:number | string):number{
        if (typeof(num1) === 'string'){
            num1=parseInt(num1);
        }
        if (typeof(num2)==='string'){
            num2=parseInt(num2);
        }
        return num1+num2;
    }
let mihijo;

