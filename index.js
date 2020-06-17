document.addEventListener("touchstart", function () {}, false);

function Calculator() {
  let displayValue = "0";
  let firstOperand = null;
  let waitingForSecondOperand = false;
  let operator = null;

  updateDisplay();

  function updateDisplay() {
    const display = document.querySelector(".result p");
    display.textContent = displayValue;
  }

  function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
      displayValue = digit;
      waitingForSecondOperand = false;
    } else {
      displayValue = displayValue === "0" ? digit : displayValue + digit;
    }
  }

  function inputDecimal(dot) {
    if (waitingForSecondOperand === true) return;
    if (!displayValue.includes(dot)) {
      displayValue += dot;
    }
  }

  function performCalculation(operator, firstOperand, secondOperand) {
    switch (operator) {
      case "÷":
        return firstOperand / secondOperand;

      case "×":
        return firstOperand * secondOperand;

      case "+":
        return firstOperand + secondOperand;

      case "−":
        return firstOperand - secondOperand;

      case "=":
        return secondOperand;

      default:
        return secondOperand;
    }
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      operator = nextOperator;
      return;
    }

    if (firstOperand == null) {
      firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, inputValue);

      displayValue = String(result);
      firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
  }

  function reset() {
    displayValue = "0";
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
  }

  this.keyDown = function (type, value) {
    switch (type) {
      case "number":
        inputDigit(value);
        updateDisplay();
        break;

      case "decimal":
        inputDecimal(value);
        updateDisplay();
        break;

      case "clear":
        reset();
        updateDisplay();
        break;

      case "operator":
      case "equals":
        handleOperator(value);
        updateDisplay();
        break;

      default:
        break;
    }
  };
}

let calculator = new Calculator();

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.keyDown(button.getAttribute("type"), button.textContent);
  });
});
