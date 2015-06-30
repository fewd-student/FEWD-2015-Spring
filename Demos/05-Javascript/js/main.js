$(document).ready(function() {
	$(".calculator").submit(calculate);
});

function calculate(event) {
	event.preventDefault();

	var inputOne = $(".input_one").val();
	var inputTwo = $(".input_two").val();
	var operator = $(".operator").val();

	var operators = ["+","-","*","/"];

	var equation;
	var result;
	var valid = true;

	equation = inputOne + operator + inputTwo;

	if (isNaN(inputOne) || isNaN(inputTwo)) {
		valid = false;
	}

	if (!$.inArray(operator, operators)) {
		valid = false;
	}

	if (valid) {
		result = eval(equation);
	} else {
		result = "ERROR";
	}

	$(".output").val(result);
}



