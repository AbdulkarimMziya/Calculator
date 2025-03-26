function add(a,b){
    return a + b;
}
  
function subtract(a,b){
    return a - b;
}
  
function multiply(a,b){
    return a * b;
}
  
function divide(a,b){
    return a / b;
}


// Function to perform an operation based on the given operator and operands
function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error('Unknown operator');
    }
}

// Select all digit buttons
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelectorAll(".equals");
const display = document.querySelector(".display");

// Calculator state
let firstOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;
let currentInput = "0";

// Update the display
function updateDisplay() {
    display.textContent = currentInput;
}

function handleDigitClick(event) {
    // Get the digit from the button's text content
    const digit = event.target.textContent;
  
    console.log("Type before update:", typeof display.textContent);
  
    // If waitingForSecondOperand is true (after an operator was clicked)
    if (waitingForSecondOperand) {
        currentInput = digit
        waitingForSecondOperand = false;
    } else {
        currentInput = (currentInput === '0' ? digit : currentInput + digit)
    }
    
   updateDisplay();
}

function handleOperatorClick(event) {
    const inputValue = parseFloat(currentInput);

    if (firstOperand === null) {
        firstOperand = inputValue;
    }
    else if (currentOperator) {
        const result = operate(currentOperator, firstOperand, inputValue);
        currentInput = String(result);
        firstOperand = result;
        updateDisplay();
    }

    currentOperator = event.target.textContent;
    waitingForSecondOperand = true;
}

// Add event listeners to each digit button
digitButtons.forEach((button) => {
    button.addEventListener('click',handleDigitClick)
});

operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});