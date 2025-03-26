// Functions for basic arithmetic operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

// Division function with zero-check to prevent errors
function divide(a, b) {
    if (b === 0) {
        return NaN; // Return 0 instead of dividing by zero
    }
    return a / b;
}

// Perform an operation based on the given operator and operands
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error('Unknown operator'); // Error for invalid operator
    }
}

// Select DOM elements
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const display = document.querySelector(".display");

// Calculator state variables
let firstOperand = null;            // Stores the first number
let currentOperator = null;         // Stores the current operator
let waitingForSecondOperand = false; // Tracks if waiting for second number input
let currentInput = "0";              // Tracks the current number being displayed

// Update the display with the current input value
function updateDisplay() {
    display.textContent = currentInput;
}

// Handle digit button click
function handleDigitClick(event) {
    const digit = event.target.textContent; // Get the clicked digit
    
    // Check if the display needs to be reset for a new number
    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
        removeHighlight(); // Remove highlight once the user enters the second number
    } else {
        // Append the digit to the current input or replace '0'
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    
    updateDisplay(); // Update the screen with the new input
}

// Handle operator button click
function handleOperatorClick(event) {
    const inputValue = parseFloat(currentInput); // Convert input to number

    // Prevent repeated operators without a second operand
    if (waitingForSecondOperand) {
        currentOperator = event.target.textContent;
        highlightOperator(event.target);
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue; // Store first number
    } else if (currentOperator) {
        // Perform calculation if both operands and an operator exist
        const result = operate(currentOperator, firstOperand, inputValue);
        currentInput = String(result); // Convert result to string for display
        firstOperand = result; // Use result as the next input
        updateDisplay();
    }

    // Store the chosen operator and prepare for the second number
    currentOperator = event.target.textContent;
    waitingForSecondOperand = true;
    highlightOperator(event.target); // Highlight the clicked operator
}

// Handle equals button click
function handleEqualsClick() {
    // Prevent calculation if missing values
    if (firstOperand === null || !currentOperator || waitingForSecondOperand) return;

    const inputValue = parseFloat(currentInput);
    const result = operate(currentOperator, firstOperand, inputValue);

    // Display result and reset state
    currentInput = String(result);
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = true;

    updateDisplay();
    removeHighlight(); // Remove highlight after calculation
}

// Handle clear button click - Reset everything
function handleClearClick() {
    currentInput = "0";
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    updateDisplay();
    removeHighlight(); // Remove highlight when cleared
}

// Function to highlight the selected operator
function highlightOperator(selectedButton) {
    // Remove any previous highlights
    operatorButtons.forEach(button => button.classList.remove('highlight'));
    
    // Add highlight to the selected operator
    selectedButton.classList.add('highlight');
}

function removeHighlight() {
    operatorButtons.forEach(button => button.classList.remove('highlight'));
}

// Event Listeners
digitButtons.forEach((button) => {
    button.addEventListener('click', handleDigitClick);
});

operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

equalsButton.addEventListener('click', handleEqualsClick);
clearButton.addEventListener('click', handleClearClick);