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
      case "divide":
        return firstOperand / secondOperand;

      case "multiply":
        return firstOperand * secondOperand;

      case "add":
        return firstOperand + secondOperand;

      case "subtract":
        return firstOperand - secondOperand;

      case "equals":
        return secondOperand;

      default:
        return secondOperand;
    }
  }

  function handleEngage(operator) {
    let divide = document.querySelector("#divide");
    let multiply = document.querySelector("#multiply");
    let add = document.querySelector("#add");
    let subtract = document.querySelector("#subtract");

    if (operator) {
      switch (operator) {
        case "divide":
          divide.classList.add("engaged");
          multiply.classList.remove("engaged");
          add.classList.remove("engaged");
          subtract.classList.remove("engaged");
          break;

        case "multiply":
          divide.classList.remove("engaged");
          multiply.classList.add("engaged");
          add.classList.remove("engaged");
          subtract.classList.remove("engaged");
          break;

        case "add":
          divide.classList.remove("engaged");
          multiply.classList.remove("engaged");
          add.classList.add("engaged");
          subtract.classList.remove("engaged");
          break;

        case "subtract":
          divide.classList.remove("engaged");
          multiply.classList.remove("engaged");
          add.classList.remove("engaged");
          subtract.classList.add("engaged");
          break;

        case "equals":
        default:
          divide.classList.remove("engaged");
          multiply.classList.remove("engaged");
          add.classList.remove("engaged");
          subtract.classList.remove("engaged");
          break;
      }
    } else {
      divide.classList.remove("engaged");
      multiply.classList.remove("engaged");
      add.classList.remove("engaged");
      subtract.classList.remove("engaged");
    }
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    handleEngage(nextOperator);

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
    handleEngage();
  }

  this.keyDown = function (type, value, operator) {
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
        handleOperator(operator);
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
    calculator.keyDown(
      button.getAttribute("type"),
      button.textContent,
      button.getAttribute("operator")
    );
  });
});
