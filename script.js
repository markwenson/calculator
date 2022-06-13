let currentOperand = ""
let previousOperand = ""
let operator = null

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

function clear() {
    currentOperand = ""
    previousOperand = ""
    operator = null
}

function deleteChar() {
    currentOperand = currentOperand.toString().slice(0, currentOperand.length - 1)
}

function appendNumber(number) {
    if(number === "." && currentOperandText.innerText.includes(".")) {return}
    currentOperand = currentOperand + number.toString()
    console.log(currentOperand)
}

function chooseOperator(operation) {
    if(currentOperand == '') {return}
    if(previousOperand != '') {
        console.log(previousOperand)
        compute()
    }
    operator = operation
    previousOperand = currentOperand
    console.log(previousOperand)
    currentOperand = ''
}

function updateDisplay() {
    currentOperandText.innerText = currentOperand
    if(previousOperand != '') {
        previousOperandText.innerText = `${previousOperand} ${operator}`
    }
    if (operator === null) {
        previousOperandText.innerText = ''
    }
    if(previousOperand == '' && currentOperand == '') {
        previousOperandText.innerText = ''
        currentOperandText.innerText = ''
    }
}

function compute() {
    let computation
    let currentValue = parseFloat(currentOperand)
    let previousValue = parseFloat(previousOperand)
    if(isNaN(currentValue) || isNaN(previousValue)) {return}
    switch(operator) {
        case '+': 
            computation = currentValue + previousValue
            break
        case '-': 
            computation = previousValue - currentValue
            break
        case '÷': 
            computation = previousValue / currentValue
            break
        case '*': 
            computation = previousValue * currentValue
            break
        default:
            return
    }
    if (computation === 0) {computation = '0'}
    currentOperand = computation
    operator = null
    previousOperand = ''
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
    appendNumber(button.innerText)
    updateDisplay()
})})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
    chooseOperator(button.innerText)
    updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    compute()
    updateDisplay()
})

deleteButton.addEventListener('click', () => {
    deleteChar()
    updateDisplay()
})

clearButton.addEventListener('click', () => {
    clear()
    updateDisplay()
})