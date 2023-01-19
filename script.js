
let expression = "";
let expression_el = document.getElementById("expr");
let equ_el = document.getElementById("equ");

let current_op = "";
let previous_op = null;
let operation = null;

function update_expr() {
    if (operation == null) {
        expression_el.innerText = current_op.toString();
    } else if (previous_op === null) {
        expression_el.innerText = `${previous_op}${operation}`;
    } else {
        expression_el.innerText = `${previous_op}${operation}${current_op}`;
    }

}

function on_del() {
    current_op = "";
    previous_op = null;
    operation = null;
    update_expr();
}

function on_c() {
    if (!current_op && operation !== null) {
        operation = null;
        current_op = previous_op;
        previous_op = null;
    } else {
        current_op = current_op.substring(0, current_op.length - 1);
    }

    update_expr();
}

function on_sq() {
    if (!current_op)
        return;
    
    current_op = (parseFloat(current_op) ** 2).toString();
    update_expr();
}

function on_click(value) {
    if (value == "." && current_op.includes("."))
        return;

    current_op += value;
    update_expr();
}

const OPERATIONS = {
    "/": (a, b) => a / b,
    "*": (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
}

function on_operation(value) {
    if (!current_op)
        return;

    if (previous_op === null) {
        previous_op = current_op;
        current_op = "";
    }

    operation = value;
    operation_func = OPERATIONS[value];
    update_expr();
}

function on_neg() {
    if (current_op.startsWith("-")) {
        current_op = current_op.substring(1);
    } else {
        current_op = "-" + current_op;
    }

    update_expr();
}

function on_calc() {
    if (operation == null)
        return;

    current_op = operation_func(
        parseFloat(previous_op),
        parseFloat(current_op))
        .toString();
    
    if (current_op == "Infinity")
        current_op = "Вселенная схлопнулась.";

    previous_op = null;
    previous_op = null;
    operation = null;

    update_expr();
}
