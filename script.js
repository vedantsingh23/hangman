$(document).ready(function(){
//Array of words for game
var words = ['messi','kevin','crawfish','sushi','basketball','laptop','daniel','super', 'lambo']

//Choose random word using index
var chosenWord = words[Math.floor(Math.random()*words.length)]
var guessedLetters= []
var remainingGuesses = 6

//Displays underscores for each letter of the chosen word
for(var i=0;i< chosenWord.length;i++){
    $('#word-container').append('<div class="hidden-letter">_</div>')
}

//Function to update the display of the guessed letters
function updateGuesses(){
    $('#guess-container').empty()
    $('#guess-container').text("Guessed Letters: " + guessedLetters.join(', '))
}

//Function to check if the guess letter is in the chosen word
function checkGuess(letter){
    if(chosenWord.indexOf(letter) === -1){
        remainingGuesses--
        $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
    }else {
        //Reveal the guessed letter
        $('.hidden-letter').each(function(index){
            if(chosenWord[index] === letter){
                $(this).text(letter)
            }
        })
    }
    updateGuesses()
    checkGameStatus()
}

//Function to check if the game has been won or lost
function checkGameStatus(){
    if($('.hidden-letter:contains("_")').length ===0){
        alert('Congratulations You Won!')
        resetGame()
    }else if(remainingGuesses === 0){
        alert('You Suck! The word was: ' + chosenWord)
        resetGame()
    }
}

//Function to reset the game
function resetGame(){
    guessedLetters = []
    remainingGuesses = 6
    $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
    $('#word-container').empty()
    chosenWord = words[Math.floor(Math.random()*words.length)]
    for(var i=0;i < chosenWord.length;i++){
        $('#word-container').append('<div class="hidden-letter">_</div>')
    }
    updateGuesses()
}

//Event handler for key presses
$(document).keypress(function(event){
    var letter = String.fromCharCode(event.which).toLowerCase()
    if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
        guessedLetters.push(letter)
        checkGuess(letter)
    }
})

//Event handler for reset button
$('#reset-button').click(function(){
    resetGame()
})

//Initial display of remaining guesses
$('#remaining-gueses').text('Remaining Guesses: ' + remainingGuesses);
})

$(document).ready(function() {
    // Timer variables
    var timerInterval;
    var timeLeft = 60; // Set initial time in seconds

    // Start the timer
    function startTimer() {
        timerInterval = setInterval(function() {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                // Add any actions you want to happen when the time runs out
                alert("Time's up!");
            }
        }, 1000); // Update every second
    }

    // Update the timer display
    function updateTimerDisplay() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        var timerDisplay = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        $("#remaining-time").text(timerDisplay);
    }

    // Call the startTimer function to begin counting down
    startTimer();

    // Your existing Hangman game logic can go here

    // Example function to reset the game
    $("#reset-button").click(function() {
        // Reset the timer
        clearInterval(timerInterval);
        timeLeft = 60;
        startTimer();

        // Add any additional reset logic for your game here
    });
});
