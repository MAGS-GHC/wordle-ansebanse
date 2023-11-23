//First we define the varaible that we need to create our board game
let lengthofword = 5;
let numofguesses = 6;

//We then would like to create a current view of where you are on the board, so we create these to variables:
let currGuess = 0; 
let letterplace = 0; 

let gameOver = false; // this statement make it possible to make the game come to an end.

//Getting the word through the list and onto the game. We make the word list into an array:
let wordList = [];
let word = "";

getText("/Assets/wordle.txt");
async function getText(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();
    wordList = myText.split(" ");
    word = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();

    console.log(word);
}

// We start by running this so that as soon as we open the page it running these function, 
// we do so because it is part of the board game. The other function that i have run after different comands.
// Here we are calling the function, afterware we define it.
window.onload = function() {
    startup();
}


function startup() {

    // Create the game board
    for (let r = 0; r < numofguesses; r++) {
        for (let c = 0; c < lengthofword; c++) {
            // <span id="0-0" class="square">P</span>
            let square = document.createElement("span");
            square.id = r.toString() + "-" + c.toString();
            square.classList.add("square");
            square.innerText = "";
            document.getElementById("board").appendChild(square);
        }
    }


    // Now we want to add letters to our board based on what input we do through the keyboard. we
    document.addEventListener("keyup", (e) => {
        if (gameOver) return; 

        // alert(e.code);
       if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (letterplace < lengthofword) {
                let currSquare = document.getElementById(currGuess.toString() + '-' + letterplace.toString());
                if (currSquare.innerText == "") {
                    currSquare.innerText = e.code[3];
                    letterplace += 1;
                }
            }
        }

        else if (e.code == "Backspace") {
        if (0 < letterplace && letterplace <= lengthofword) {
                letterplace -=1;
            }
            let currSquare = document.getElementById(currGuess.toString() + '-' + letterplace.toString());
            currSquare.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
            currGuess += 1; //start new currGuess
            letterplace = 0; //start at 0 for new currGuess
        }


        if (!gameOver && currGuess == numofguesses) {
            gameOver = true;
            document.getElementById("answer").innerText = "You have used up all your guesses. The word was " + word;
        }

    })
}


function update() {
    
    let guess = "";
    document.getElementById("answer").innerText = "";

    //string up the guesses into the word
    for (let c = 0; c < lengthofword; c++) {
        let currSquare = document.getElementById(currGuess.toString() + '-' + c.toString());
        let letter = currSquare.innerText;
        guess += letter;
    }

    guess = guess.toLowerCase(); //case sensitive
    console.log(guess);

    if (!wordList.includes(guess)) {
        document.getElementById("answer").innerText = "Not in word list";
        return;
    }
    

    let correct = 0;

    for (let c = 0; c < lengthofword; c++) {
        let currSquare = document.getElementById(currGuess.toString() + '-' + c.toString());
        let letter = currSquare.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currSquare.classList.add("correct");

            correct += 1;
            
        } // Is it in the word?
        else if (word.includes(letter)) {
            currSquare.classList.add("present");
        } // Not in the word
        else {
            currSquare.classList.add("absent");
        }

        if (correct == lengthofword) {
            gameOver = true;
            document.getElementById("answer").innerText = "Congratz! You figured out the word was " + word;
        }

    }
}