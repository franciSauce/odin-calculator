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

}
// Function to display error message

// Compute the result of the operation

// Format the number for output

// Update the output with current & previous operations

// Function to handle button clicks

// Add click event listeners to the buttons

// Key mapping object for specific keys

// Add keydown event listener with key

// Handle numbers (0 - 9)

// Handle special keys

// Prevent default behavior for special keys