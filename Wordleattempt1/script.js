// Creating the squares:
document.addEventListener("DOMContentLoaded", () => {
    
    createSquares();
  
    let GuessedWords = [[]];
    let availableSpace = 1;
  
    let word = "dairy";
    //word = ['apple', ]
  
    const keys = document.querySelectorAll(".keyboard-row button");
  
    function HandleSubmitWord() {
        const CurrentWorldArray = getCurrentWorldArray();
        if(CurrentWorldArray.length !== 5){
            window.alert("Word must be 5 letters");
        };

        const currentWord = CurrentWorldArray.join("");

        if (currentWord === word) {
            window.alert("Congratulations! You got the word correct!");
        };

        if (GuessedWords.length === 6) {
            window.alert("Sorry you have no more guesses! The word is ${word}.");
        };

        GuessedWords.push([]);

    }
  
    function getCurrentWorldArray() {
      const numberOfGuessedWords = GuessedWords.length;
      return GuessedWords[numberOfGuessedWords - 1]
    }
  
    function UpdateGuessedWords(letter) {
      const CurrentWorldArray = getCurrentWorldArray();
  
      if (CurrentWorldArray && CurrentWorldArray.length < 5) {
        CurrentWorldArray.push(letter);
  
        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpace = availableSpace + 1;
  
        availableSpaceEl.textContent = letter;
      };
    }

    //To create all 30 squares, so creating the boardgame. we use this for loop so we
    function createSquares() {
      const gameBoard = document.getElementById("board");
  
      for (let index = 0; index < 30; index++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", index + 1);
        gameBoard.appendChild(square);
      }
    }
    
    //This for loop creates i onclick function that links us back to the letter that have been assigned, and then links
    //it back the enter button in order to check if it suits the wanted answer.
    for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = ({ target }) => {
        const letter = target.getAttribute("data-key");
  
        UpdateGuessedWords(letter);
  
        if (letter === 'enter') {
          HandleSubmitWord()
          return;
        }
      };
    }
  });