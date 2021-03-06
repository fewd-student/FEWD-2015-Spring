
	var currentInput = "";
	var operators = ["+", "-", "/", "*"];
	var hasOperated = false;
	var hasSolved = false;

	$(document).ready(function() {

		// Bind events
		$(".digit, .operator").click(onButtonPress);
		$(".equals").click(onCalculate);
		$(".clear").click(onClear);

	});


	var zeroActive = true;
	var blinkInterval;

	function blinkZero() {
		if (zeroActive) {
			$(".display").val("");
		} else {
			$(".display").val("0");
		}

		zeroActive = !zeroActive;
	}

	function startBlinkZero() {
		blinkInterval = setInterval("blinkZero()", 500);
	}

	function stopBlinkZero() {
		clearInterval(blinkInterval);
		$(".display").css({ opacity: 1 });
	}


	function onButtonPress(e) {
		// Get current action
		var action = $(this).data("action").toString();
		var isOperator = (operators.indexOf(action) > -1);

		if (isOperator && hasOperated) {
			return;
		}

		hasOperated = isOperator;

		// Check if first input
		if (currentInput == "0") {
			// Can't start with an operator
			if (isOperator) {
				return;
			}

			// Otherwise, set action
			currentInput = action;
		} else {
			if (hasSolved && !isOperator) {
				// Must chain operators
				currentInput = action;
			} else {
				// Concat input
				currentInput += action;
			}
		}

		// Update display
		updateDisplay();

		hasSolved = false;
	}

	// Calculate result
	function onCalculate(e) {
		var result = eval(currentInput);

		if (isNaN(result)) {
			result = "ERROR";
		}

		currentInput = result;

		updateDisplay();

		hasSolved = true;
	}

	// Clear screen
	function onClear(e) {
		currentInput = "0";

		updateDisplay();
	}

	// Update display
	function updateDisplay() {
		if (currentInput == "0") {
			startBlinkZero();
		} else {
			stopBlinkZero();
		}

		$(".display").val(currentInput);
	}
