//Wait for the DOM to finish loading before running the game
//Get the button elements and ad event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type"); {
                    runGame(gameType);
                }
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function (event){
        if (event.key==="Enter"){
            checkAnswer();
        }
    })

    runGame(gameType);
});

/**
 * The main game "loop, called when the script is first loaded 
 * and after the user's answer has been processed"
 */
function runGame(gameType) {

    document.getElementById("answer-box").value="";
    document.getElementById("answer-box").focus();

    //Creates two random numbers between 1 & 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    }else if (gameType === "subtract") {
            displaySubtractQuestion(num1, num2);
        } else {
            alert(`Unknown game type: ${gameType}`);
            throw `Unknown game type: ${gameType}. Aborting!`;
        }

    }

    /**
     * Checks the answer against the first element in
     * the returned calculatCorrectAnswer array
     */
    function checkAnswer() {
        let userAnswer = parseInt(document.getElementById("answer-box").value);
        let calculatedAnswer = calculateCorrectAnswer();
        let isCorrect = userAnswer === calculatedAnswer[0];

        if (isCorrect) {
            alert("Congrats bitch");
            incrementScore();
        } else if (userAnswer === 69) {
            alert("ewwww");
        } else {
            alert(`dang homie, get yo ass outta here. The correct answer is ${calculatedAnswer[0]}. Don't come back round here no more!`);
            incrementWrongAnswer();
        }



        runGame(calculatedAnswer[1]);

    }
    /**
     * Gets the operands (the numbers) and the operator (plus, minus etc)
     * directly from the dom, and retuns the correct answer.
     */
    function calculateCorrectAnswer() {

        let operand1 = parseInt(document.getElementById('operand1').innerText);
        let operand2 = parseInt(document.getElementById('operand2').innerText);
        let operator = document.getElementById("operator").innerText;

        if (operator === "+") {
            return [operand1 + operand2, "addition"];
        } else if (operator === "x") {
            return [operand1 * operand2, "multiply"];
        } else if(operator ==="-") {
            return [operand1 - operand2, "subtract"];
        } else {
            alert(`Unimplemented operator ${operator}`);
            throw `Unimplemented operator ${operator}. Aborting!`;
        }

    }
    /**
     * Gets the current score from the DOM and increments by 1
     */
    function incrementScore() {
        let oldScore = parseInt(document.getElementById("correct").innerText);
        document.getElementById("correct").innerText = ++oldScore;


    }

    /**Gets the correct tally of incorrect answers from DOM and increments by 1
     */
    function incrementWrongAnswer() {
        let oldIncorrectScore = parseInt(document.getElementById("incorrect").innerText);
        document.getElementById("incorrect").innerText = ++oldIncorrectScore;
    }

    function displayAdditionQuestion(operand1, operand2) {
        document.getElementById('operand1').textContent = operand1;
        document.getElementById('operand2').textContent = operand2;
        document.getElementById('operator').textContent = "+";
    }


    function displaySubtractQuestion(operand1, operand2) {
        document.getElementById("operand1").textContent= operand1 > operand2? operand1 : operand2;
        document.getElementById("operand2").textContent= operand1 > operand2? operand2 : operand1;
        document.getElementById('operator').textContent = "-";
        
    }

    function displayMultiplyQuestion(operand1, operand2) {
        document.getElementById('operand1').textContent = operand1;
        document.getElementById('operand2').textContent = operand2;
        document.getElementById('operator').textContent = "x";
    }