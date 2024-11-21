// Calculator object
const calculator = {
    prevOpTextElement: document.querySelector("[data-prev-op}"),
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
    displayErrorMsg(msg) {
        const errorMsgElement = document.createElement("div");
        errorMsgElement.classList.add("error-msg");
        errorMsgElement.textContent = msg;

        const displayContainer = document.querySelector(".display");
        displayContainer.appendChild(errorMsgElement);

        setTimeout(()=> {
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
        }

        this.currOp = result;
        this.operation = undefined;
        this.prevOp = "";
    },
}




// Format the number for output

// Update the output with current & previous operations

// Function to handle button clicks

// Add click event listeners to the buttons

// Key mapping object for specific keys

// Add keydown event listener with key

// Handle numbers (0 - 9)

// Handle special keys

// Prevent default behavior for special keys