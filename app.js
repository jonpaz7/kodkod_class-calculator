import { operations } from "./operations.js";

const display = document.querySelector("#display");
const displayStatus = document.querySelector("#display-status");
const displayHint = document.querySelector("#display-hint");
const keypad = document.querySelector("#keypad");
const clearButton = document.querySelector("#clear");
const operationGrid = document.querySelector("#operation-grid");
const emptyOperations = document.querySelector("#empty-operations");
const contributorList = document.querySelector("#contributor-list");
const operationCount = document.querySelector("#operation-count");

let currentValue = 0;
let currentInput = "0";
let pendingOperation = null;
let awaitingSecondOperand = false;
let replaceOnNextDigit = false;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    throw new Error("The result must be a finite number.");
  }

  return String(Number(value.toPrecision(12)));
}

function setStatus(message, isError = false) {
  displayStatus.textContent = message;
  displayStatus.classList.toggle("is-error", isError);
}

function updateDisplay() {
  display.textContent = currentInput;
  displayHint.textContent = pendingOperation
    ? `${formatNumber(pendingOperation.firstOperand)} ${pendingOperation.operation.symbol} — enter another number`
    : "Choose a number to get started";
}

function enterDigit(digit) {
  if (awaitingSecondOperand || replaceOnNextDigit) {
    currentValue = 0;
    currentInput = "0";
    awaitingSecondOperand = false;
    replaceOnNextDigit = false;
  }

  if (digit === ".") {
    if (currentInput.includes(".")) {
      return;
    }
    currentInput += ".";
  } else {
    const nextValue = `${currentInput === "0" ? "" : currentInput}${digit}`;
    if (nextValue.replace(".", "").length > 15) {
      setStatus("Maximum of 15 digits", true);
      return;
    }
    currentInput = nextValue;
    currentValue = Number(nextValue);
  }

  currentValue = Number(currentInput);
  setStatus(pendingOperation ? "Enter the second number" : "Number entered");
  updateDisplay();
}

function calculate(operation, firstOperand, secondOperand) {
  try {
    const result = operation.arity === 1
      ? operation.execute(firstOperand)
      : operation.execute(firstOperand, secondOperand);
    const parsedResult = Number(result);
    currentValue = Number(formatNumber(parsedResult));
    currentInput = formatNumber(currentValue);
    pendingOperation = null;
    awaitingSecondOperand = false;
    replaceOnNextDigit = true;
    setStatus(`${operation.label} complete`);
    updateDisplay();
    renderEqualsButton();
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "The operation could not be completed.", true);
  }
}

function selectOperation(operation) {
  if (operation.arity === 1) {
    calculate(operation, currentValue);
    return;
  }

  const firstOperand = pendingOperation && awaitingSecondOperand
    ? pendingOperation.firstOperand
    : currentValue;
  pendingOperation = { operation, firstOperand };
  awaitingSecondOperand = true;
  replaceOnNextDigit = false;
  setStatus(`Selected ${operation.label}`);
  updateDisplay();
  renderEqualsButton();
}

function renderEqualsButton() {
  const existingButton = keypad.querySelector(".equals-key");
  if (existingButton) {
    existingButton.remove();
  }

  if (!pendingOperation) {
    return;
  }

  const equalsButton = document.createElement("button");
  equalsButton.className = "equals-key";
  equalsButton.type = "button";
  equalsButton.textContent = `Calculate ${pendingOperation.operation.label}`;
  equalsButton.setAttribute("aria-label", `Calculate ${pendingOperation.operation.label}`);
  equalsButton.addEventListener("click", () => {
    if (awaitingSecondOperand) {
      setStatus("Enter the second number first", true);
      return;
    }

    calculate(pendingOperation.operation, pendingOperation.firstOperand, currentValue);
    renderEqualsButton();
  });
  keypad.append(equalsButton);
}

function renderOperations() {
  operationGrid.replaceChildren();
  contributorList.replaceChildren();
  operationCount.textContent = String(operations.length);
  emptyOperations.hidden = operations.length > 0;

  for (const operation of operations) {
    const button = document.createElement("button");
    button.className = "operation-button";
    button.type = "button";
    button.dataset.operationSymbol = operation.symbol;
    button.setAttribute("aria-label", `${operation.label}, ${operation.arity === 1 ? "one" : "two"} number${operation.arity === 1 ? "" : "s"}`);

    const symbol = document.createElement("span");
    symbol.className = "operation-symbol";
    symbol.textContent = operation.symbol;

    const label = document.createElement("span");
    label.className = "operation-label";
    label.textContent = operation.label;

    button.append(symbol, label);
    button.addEventListener("click", () => selectOperation(operation));
    operationGrid.append(button);

    const item = document.createElement("li");
    item.className = "contributor-item";
    const avatar = document.createElement("span");
    avatar.className = "contributor-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = operation.contributor?.trim().charAt(0).toUpperCase() || "✦";

    const details = document.createElement("div");
    details.className = "contributor-details";
    const name = document.createElement("div");
    name.className = "contributor-name";
    name.textContent = operation.contributor?.trim() || "Contributor not listed";
    const operationName = document.createElement("div");
    operationName.className = "contributor-operation";
    operationName.textContent = operation.label;
    details.append(name, operationName);
    item.append(avatar, details);
    contributorList.append(item);
  }

  if (operations.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-contributors";
    emptyItem.textContent = "Your class will show up here.";
    contributorList.append(emptyItem);
  }
}

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("[data-digit]");
  if (button) {
    enterDigit(button.dataset.digit);
  }
});

clearButton.addEventListener("click", () => {
  currentValue = 0;
  currentInput = "0";
  pendingOperation = null;
  awaitingSecondOperand = false;
  replaceOnNextDigit = false;
  setStatus("Ready when you are");
  updateDisplay();
  renderEqualsButton();
});

function flashButton(button) {
  button.classList.add("keyboard-active");
  window.setTimeout(() => button.classList.remove("keyboard-active"), 140);
}

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return;
  }

  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || target.matches("input, textarea, select"))) {
    return;
  }

  if (/^[0-9.]$/.test(event.key)) {
    const button = keypad.querySelector(`[data-digit="${event.key}"]`);
    if (button) {
      event.preventDefault();
      flashButton(button);
      button.click();
    }
    return;
  }

  if (["-", "%", "^", "!"].includes(event.key)) {
    const symbols = event.key === "!" ? ["!", "n!"] : [event.key];
    const operation = operations.find((item) => symbols.includes(item.symbol));
    const button = operation && Array.from(operationGrid.querySelectorAll(".operation-button"))
      .find((item) => item.dataset.operationSymbol === operation.symbol);
    if (button) {
      event.preventDefault();
      flashButton(button);
      button.click();
    }
    return;
  }

  if (event.key === "Enter" || event.key === "=") {
    const button = keypad.querySelector(".equals-key");
    if (button) {
      event.preventDefault();
      flashButton(button);
      button.click();
    }
    return;
  }

  if (event.key === "Escape" || event.key === "Backspace" || event.key.toLowerCase() === "c") {
    event.preventDefault();
    flashButton(clearButton);
    clearButton.click();
  }
});

renderOperations();
updateDisplay();
