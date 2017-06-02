// Default JavaScript Functions and Initiations
//document.addEventListener("DOMContentLoaded", function() {
// Handler when the DOM is fully loaded
// General Variables
let equation = [],
    isDecimal = false;

// HTML 
let numbers = document.getElementsByClassName("numbers"),
    equal = document.getElementById("eq"),
    screen = document.getElementsByClassName("screen")[0].children[0],
    clear = document.getElementById("clear"),
    decimal = document.getElementById("decimal"),
    perc = document.getElementById('prct'),
    pm = document.getElementById("pm"),
    add = document.getElementById("add"),
    sub = document.getElementById("sub"),
    multi = document.getElementById("mult"),
    div = document.getElementById("div");



// adding event listeners to respective button clicks
buttons.addEventListener('click', btnClick, true); // number clicks
equal.addEventListener('click', evaluate, true); // equals btn
clear.addEventListener('click', clearScreen, true); // clear btn
decimal.addEventListener('click', decClick, true); // add decimal
pm.addEventListener('click', plusMinus, true); // plus minus click
perc.addEventListener('click', percentage, true); // percent click
add.addEventListener('click', addition, true); // add
sub.addEventListener('click', subtraction, true); // subtract
multi.addEventListener('click', multiply, true); // multiply
div.addEventListener('click', divide, true); // divide

function btnClick(e) {
    let val = e.target.innerHTML;
    if (e.target.innerHTML.match(/\d/)) {
        equation.push(val);
        screenUpdate(equation.join(""));
    }
}

// Operand Functions
function addition() {
    let plus = "+";
    decClick.false();
    pushInput(plus);
}

function subtraction() {
    let minus = "-";
    decClick.false();
    pushInput(minus);
}

function multiply(argument) {
    let times = "*";
    decClick.false();
    pushInput(times);
}

function divide(argument) {
    let slash = "/";
    decClick.false();
    pushInput(slash);
}

// needs work
function plusMinus() {
    if (!isNaN(equation.last())) {
        decClick.false();
        equation.join("");
        equation = -equation;
        equation = [equation];
        screenUpdate(equation.join(""));
    }
}

function percentage() {
    var value,
        operator = "/";
    if (!isNaN(equation.last())){
      evaluate();
      equation[0] = equation[0]/100;
      screenUpdate(equation.join("")); 
     } 
}

function evaluate() {
    if (!isNaN(equation.last())) {
        equation = [eval(equation.join(""))];
        screenUpdate(equation[0]);
    }

}

// decimal click

function decClick(e) {
    let val = e.target.innerHTML;
    if (!isDecimal){
      equation.push(val);
      isDecimal = true;
      screenUpdate(equation.join(""));
    }
}

decClick.false = function (){
   isDecimal = false;
}

// push new part of equation

function pushInput(input) {
    if (!isNaN(equation.last())) {
        equation.push(input);
        screenUpdate(equation.join(""));
    }
}

// Screen and data updates

function screenUpdate(value) {
    screen.innerHTML = value;
}

function clearScreen(x) {
    equation = [];
    screenUpdate("");
    console.log(equation);
}

// Add New Array Methods
if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };
};

//}); // end document ready