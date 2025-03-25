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
const display = document.querySelector(".display");

// Add event listeners to each digit button
digitButtons.forEach((button) => {
  button.addEventListener('click',handleDigitClick)
});

function handleDigitClick(event) {
    // Get the digit from the button's text content
    const digit = event.target.textContent;
  
    console.log("Type before update:", typeof display.textContent);
  
    // Update the display
    if (display.textContent === '0') {
        display.textContent = digit;
    } else {
        display.textContent += digit;
    }
    
    // console.log(digit);
    console.log(typeof display.textContent);
}