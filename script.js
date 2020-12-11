//get elements - contents on calculator
const numberedButtons = document.querySelectorAll(".numberBtn");
const operatorButtons = document.querySelectorAll(".operatorBtn");

//screen
const leftValue = document.querySelector(".leftValue");
const operation = document.querySelector(".operation");
const rightValue = document.querySelector(".rightValue");

//loop through numbers - call the addToDisplay function
numberedButtons.forEach((button) =>
  button.addEventListener("click", addToDisplay)
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", setOperator)
);

function clear() {
  leftValue.innerText = "0";
  operation.innerText = "";
  rightValue.innerText = "";
}

// function to display output
function addToDisplay(event) {
  const character = event.target.innerText;
  const valueBox = operation.innerText ? rightValue : leftValue;
  if (valueBox.innerText === "0") {
    valueBox.innerText = "";
  }

  valueBox.innerText += character;
}

function setOperator(event) {
  if (rightValue.innerText) {
    doEquals();
  }
  const operator = event.target.innerText;
  operation.innerText = operator;
}

const decimalButton = document.querySelector(".decimalBtn");
decimalButton.addEventListener("click", decimalClick);

function decimalClick() {
  if (!rightValue.innerText.includes(".")) {
    rightValue.innerText += ".";
  }
}

const allClearButton = document.querySelector(".allClearBtn");
allClearButton.addEventListener("click", clear);

function removeLastCharacter(valueBox) {
  valueBox.innerText = valueBox.innerText.substring(
    0,
    valueBox.innerText.length - 1
  );
}

// backspace

const deleteButton = document.querySelector(".deleteBtn");
deleteButton.addEventListener("click", () => {
  if (rightValue.innerText) {
    removeLastCharacter(rightValue);
  } else if (operation.innerText) {
    operation.innerText = "";
  } else if (leftValue.innerText.length > 1) {
    removeLastCharacter(leftValue);
  } else {
    leftValue.innerText = "0";
  }
});

function calculate(left, operationStr, right) {
  switch (operationStr) {
    case "x":
      return left * right;
    case "-":
      return left - right;
    case "÷":
      return left / right;
    case "+":
      return left + right;
  }
}

function doEquals() {
  if (leftValue.innerText && rightValue.innerText && operation.innerText) {
    const left = parseFloat(leftValue.innerText);
    const right = parseFloat(rightValue.innerText);
    leftValue.innerText = calculate(left, operation.innerText, right);
    operation.innerText = "";
    rightValue.innerText = "";
  } else {
    alert("calculation incomplete");
  }
}

const equalsButton = document.querySelector(".equalsButton");
equalsButton.addEventListener("click", doEquals);
