// class Calculator {
//   displayValue = "0";
//   firstOperand = null;
//   waitingForSecondOperand = false;
//   operator = null;

//   constructor() {
//     this.updateDisplay();
//   }

//   updateDisplay() {
//     const display = document.querySelector(".result p");
//     display.textContent = this.displayValue;
//   }

//   inputDigit(digit) {
//     if (this.waitingForSecondOperand === true) {
//       this.displayValue = digit;
//       this.waitingForSecondOperand = false;
//     } else {
//       this.displayValue =
//         this.displayValue === "0" ? digit : this.displayValue + digit;
//     }
//   }

//   inputDecimal(dot) {
//     if (this.waitingForSecondOperand === true) return;
//     if (!this.displayValue.includes(dot)) {
//       this.displayValue += dot;
//     }
//   }

//   performCalculation = {
//     "÷": (firstOperand, secondOperand) => firstOperand / secondOperand,

//     "×": (firstOperand, secondOperand) => firstOperand * secondOperand,

//     "+": (firstOperand, secondOperand) => firstOperand + secondOperand,

//     "−": (firstOperand, secondOperand) => firstOperand - secondOperand,

//     "=": (firstOperand, secondOperand) => secondOperand,
//   };

//   handleOperator(nextOperator) {
//     const inputValue = parseFloat(this.displayValue);

//     if (this.operator && this.waitingForSecondOperand) {
//       this.operator = nextOperator;
//       return;
//     }

//     if (this.firstOperand == null) {
//       this.firstOperand = inputValue;
//     } else if (this.operator) {
//       const result = this.performCalculation[this.operator](
//         this.firstOperand,
//         inputValue
//       );

//       this.displayValue = String(result);
//       this.firstOperand = result;
//     }

//     this.waitingForSecondOperand = true;
//     this.operator = nextOperator;
//   }

//   reset() {
//     this.displayValue = "0";
//     this.firstOperand = null;
//     this.waitingForSecondOperand = false;
//     this.operator = null;
//   }

//   keyDown(type, value) {
//     switch (type) {
//       case "number":
//         this.inputDigit(value);
//         this.updateDisplay();
//         break;

//       case "decimal":
//         this.inputDecimal(value);
//         this.updateDisplay();
//         break;

//       case "clear":
//         this.reset();
//         this.updateDisplay();
//         break;

//       case "operator":
//       case "equals":
//         this.handleOperator(value);
//         this.updateDisplay();
//         break;

//       default:
//         break;
//     }
//   }
// }

// let calculator = new Calculator();

// document.querySelectorAll(".button").forEach((button) => {
//   button.addEventListener("click", () => {
//     calculator.keyDown(button.getAttribute("type"), button.textContent);
//   });
//   button.addEventListener("touchstart", () => {
//     calculator.keyDown(button.getAttribute("type"), button.textContent);
//   });
// });
