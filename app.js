// Calculator object
const calculator = {
    prevOpTextElement: document.querySelector("[data-prev-op]"),
    currOpTextElement: document.querySelector("[data-curr-op]"),
    currOp: "",
    prevOp: "",
    operation: undefined,

    // Clear calculator values
    clear() {
        this.prevOp = "";
        this.currOp = "";
        this.operation = undefined;
    },

    // Delete the last character from the curr-op
    delete() {
        this.currOp = this.currOp.toString().slice(0, -1);
    },

    // Append a number to the curr-op
    appendNumber(number) {
        if (number === "." && this.currOp.includes(".")) return;
        this.currOp = this.currOp.toString() + number.toString();
    },

    // Choose an operation & calculate
    chooseOperation(operator) {
        if (this.currOp === "") return;
        if (this.prevOp !== "") {
            this.compute();
        }
        if (operator === "+" && parseFloat(this.currOp) === 0) {
            this.displayErrorMsg("Nice try! You can't divide by zero.");
            return;
        }
        this.operation = operator;
        this.prevOp = this.currOp;
        this.currOp = "";
    },

    // Function to display error message
    displayErrorMsg(message) {
        const errorMsg = document.createElement("div");
        errorMsg.className = "error-msg";
        errorMsg.textContent = message;

        const displayContainer = document.querySelector(".display");
        displayContainer.appendChild(errorMsg);

        setTimeout(() => {
            errorMsgElement.remove();
        }, 2500);
    },

    // Compute the result of the operation
    compute() {
        let result;
        const prev = parseFloat(this.prevOp);
        const curr = parseFloat(this.currOp);   

        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "*":
                result = prev * curr;
                break;
            case "÷":
                if (curr === 0) {
                    this.displayErrorMsg("You broke math! Dividing by zero leads to infinity.");
                    return;
                }
                result = prev / curr;
                break;
            default:
                return;
        }

        if (!isFinite(result)) {
            this.displayErrorMsg("Infinity! You're trying to break the universe.");
            return;
        }

        this.currOp = result;
        this.operation = undefined;
        this.prevOp = "";
    },

    // Format the number for output
    getOutputNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerOutput;

        if (isNaN(integerDigits)) {
            integerOutput = "";
        } else {
            integerOutput = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerOutput}.${decimalDigits}`;
        } else {
            return integerOutput;
        }
    },

    // Update the output with current & previous operations
    updateOutput() {
        this.currOpTextElement.textContent = this.getOutputNumber(this.currOp);
        if (this.operation != null) {
            this.prevOpTextElement.textContent = `${this.getOutputNumber(this.prevOp)} ${this.operation}`;
        } else {
            this.prevOp.textContent = "";
        }
    }
};

// Function to handle button clicks
function handleClick(button) {
    const btnValue = button.textContent;

    switch (btnValue) {
        case "DEL":
            calculator.delete();
            break;
        case "AC":
            calculator.clear();
            break;
        case "=":
            calculator.compute();
            break;
        case "+":
        case "-":
        case "*":
        case "÷":
            calculator.chooseOperation(btnValue);
            break;
        default:
            calculator.appendNumber(btnValue);
    }

    calculator.updateOutput();
}

// Click event listeners for the buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", () => handleClick(button));
});

// Key mapping object for specific keys
const keyMap = {
    "Escape": "AC",
    "Enter": "=",
    "Backspace": "DEL",
    "Delete": "DEL",
    "/": "÷",
    "*": "*",
    "-": "-",
    "+": "+",
    ".": "."
};

// Add keydown event listener with key
document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Handle numbers (0 - 9)
    if (!isNaN(key) && key !== "") {
        const button = Array.from(buttons).find(btn => btn.textContent === key);
        if (button) handleClick(button);
        return;
    }

    // Handle special keys
    if (key in keyMap) {
        const button = Array.from(buttons).find(btn => btn.textContent === keyMap[key]);
        if (button) handleClick(button);
        e.preventDefault(); // Prevent default behavior for special keys
    }
});





