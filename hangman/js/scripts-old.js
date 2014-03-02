var Hangman = {
  bodyParts: 0,
  addBodyPart: function() {
    this.bodyParts ++;
  },
  isComplete: function() {
    return this.bodyParts >= 6;
  }
};

var WordToGuess = {

  listOfWords: ["football", "computer", "array", "epicodus", "string", "boolean", "function", "object", "method", "callback", "property", "prototype", "javascript", "jquery", "language", "programming", "primatives", "syntax"],

  initialize: function() {
    this.generateKey(this.selectWord());
    this.generateRevealedLetters();
  },

  selectWord: function() {
    return this.listOfWords[Math.floor(Math.random() * this.listOfWords.length)];
  },

  generateKey: function(word) {
    this.key = word.split("");
  },

  generateRevealedLetters: function() {
    this.revealedLetters = [];
    for (var i = this.key.length; i > 0; i--) {
      this.revealedLetters.push("");
    }
  },

  hasGuessedLetter: function(guessedLetter) {
    return this.key.some(function(unguessedLetter) {
      return unguessedLetter === guessedLetter;
    });
  },

  revealLetters: function(guessedLetter) {
    var key = this.key;
    this.revealedLetters = this.revealedLetters.map(function(revealedLetter, index) {
      if (guessedLetter === key[index]) {
        return guessedLetter;
      } else {
        return revealedLetter;
      }
    });
  },

  isRevealed: function() {
    return !this.revealedLetters.some(function(letter) {
      return letter === '';
    });
  }
};

var Game = {

  listOfLetters: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],

  initialize: function() {
    this.guessedLetters = [];
    this.incorrectGuessedLetters = [];
  },

  markLetterAsGuessed: function(letter) {
    this.guessedLetters.push(letter);
  },

  hasBeenGuessed: function(letter) {
    return this.guessedLetters.some(function(guessedLetter) {
      return guessedLetter === letter;
    });
  },

  markLetterAsIncorrectGuess: function(letter) {
    this.incorrectGuessedLetters.push(letter);
  },

  isOver: function(hangman, wordToGuess) {
    return hangman.isComplete() || wordToGuess.isRevealed();
  }
};

$(function() {
  var game;
  var hangman;
  var wordToGuess;
  function newGame() {
    game = Object.create(Game);
    game.initialize();
    hangman = Object.create(Hangman);
    wordToGuess = Object.create(WordToGuess);
    wordToGuess.initialize();
    $('#word-container').empty();
    wordToGuess.revealedLetters.forEach(function(letter) {
      $('#word-container').append("<p class='letter'>" + letter + "</p>");
    });
    game.listOfLetters.forEach(function(letter) {
      $("#unguessed-letters").append("<span class='letter-choice'>" + letter + "</span>");

    });
      
  }
  newGame();
  $("#unguessed-letters").on("click", ".letter-choice", function() {
    var guessedLetter = $(this).text();
    if (game.hasBeenGuessed(guessedLetter)) {
      alert("That letter has already been guessed!");

    } else if (wordToGuess.hasGuessedLetter(guessedLetter)) {
      wordToGuess.revealLetters(guessedLetter);
      $('#word-container').empty();
      wordToGuess.revealedLetters.forEach(function(letter) {
        $('#word-container').append("<p class='letter'>" + letter + "</p>");
      });
      game.markLetterAsGuessed(guessedLetter);      

    } else {
      game.markLetterAsIncorrectGuess(guessedLetter);
      game.markLetterAsGuessed(guessedLetter);
      hangman.addBodyPart();
      $('div#hangman-sprite').removeClass().addClass('hangman' + hangman.bodyParts);
      $('#incorrect-guesses h4').append(guessedLetter + "      ");
    }
    $('input#letter-input').val('');

    if (hangman.isComplete()) {
      $('#word-container').empty();
      wordToGuess.key.forEach(function(letter) {
        $('#word-container').append("<p class='letter red'>" + letter + "</p>");
      });
      alert("You lose!");
    } else if (wordToGuess.isRevealed()) {
      $('#word-container').empty();
      wordToGuess.key.forEach(function(letter) {
        $('#word-container').append("<p class='letter green'>" + letter + "</p>");
      });
      alert("You win!");
    }
    $(this).addClass("muted");
  });
});














