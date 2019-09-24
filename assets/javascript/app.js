$(document).ready(function() {
    console.log("Geography Game")
    
    let questions = [{
      question: "What is the Nationality of Algeria?",
      answers: ["Algerian", "Australian", " Algeranese", "European"],
      correctAnswer: "Algerian",
      photo1:"assets/images/win1.gif",
      photo2:"assets/images/no5.gif"
    },
    {
      question: "What is the capital of Australia?",
      answers: ["Canberra", "Sydney", "Victoria", "Hellen"],
      correctAnswer: "Canberra",
      photo1:"assets/images/win2.gif",
      photo2:"assets/images/no1.gif"
    },
    {
      question: "What city Christopher Columbus was from?",
      answers: ["Genoa", "Turin", "Spezia", "Valencia"],
      correctAnswer: "Genoa",
      photo1:"assets/images/win5.gif",
      photo2:"assets/images/no2.gif"
    },
    {
      question: "What is the capital of Norway?",
      answers: ["Buffalo", "Oslo", "Helsinki", "Trondheim"],
      correctAnswer: "Oslo",
      photo1:"assets/images/win3.gif",
      photo2:"assets/images/no5.gif"
    },
    {
      question: "What is official language of Surinam?",
      answers: ["Spanish", "French", "Dutch", "Russian"],
      correctAnswer: "Dutch",
      photo1:"assets/images/win5.gif",
      photo2:"assets/images/no5.gif"
    },
    {
      question: "What is the capital of Thailand?",
      answers: ["Ngoenyang", "Bangkok", "Hong Kong", "Kuala Lumpur"],
      correctAnswer: "Bangkok",
      photo1:"assets/images/win1.gif",
      photo2:"assets/images/no6.gif"

    }];
  
    
    let timer;
    let countStartNum = 25;
  
    var viewPort = $("#quiz-area");
  
    
    var game = {
      questions: questions,
      currentQuestion: 0,
      counter: countStartNum,
      correct: 0,
      incorrect: 0,
  
      countdown: function() {
        game.counter--;
        $("#counterNum").text(game.counter);
        if (game.counter === 0) {
          console.log("TIME UP");
          game.timeUp();
        }
      },
  
      loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
  
        viewPort.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
  
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
          viewPort.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
          + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
      },
  
      nextQuestion: function() {
        game.counter = countStartNum;
        $("#counterNum").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
      },
  
      timeUp: function() {
  
        clearInterval(timer);
  
        $("#counterNum").html(game.counter);
  
        any.html("<h2>Out of Time!!</h2>");
        any.append("<h3>The Correct Answer is: " + questions[this.currentQuestion].correctAnswer);
  
        if (game.currentQuestion === questions.length - 1) {
          setTimeout(game.results, 3 * 1000);
        }
        else {
          setTimeout(game.nextQuestion, 3 * 1000);
        }
      },
  
      results: function() {
  
        clearInterval(timer);
  
        viewPort.html("<h2>Quiz Complete, here is how you did!</h2>");
  
        $("#counterNum").text(game.counter);
  
        viewPort.append("<h3>Correct Answers: " + game.correct + "</h3>");
        viewPort.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        


        viewPort.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        viewPort.append("<br><button id='start-over'>Start Over?</button>"); 
      },
  
      clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
          this.answeredCorrectly();
        }
        else {
          this.answeredIncorrectly();
        }
      },
  
      answeredIncorrectly: function() {
  
        game.incorrect++;
  
        clearInterval(timer);
  
        viewPort.html("<h2 style='color:red'>Oops! You are Wrong</h2>");
        viewPort.append("<h3>The Correct Answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        viewPort.append("<img src='"+questions[game.currentQuestion].photo2+"'>")

        if (game.currentQuestion === questions.length -1) {
          setTimeout(game.results, 3 * 1000);
        }
        else {
          setTimeout(game.nextQuestion, 3 * 1000)
        }
      },
  
      answeredCorrectly: function() {
  
        clearInterval(timer);
  
        game.correct++;
  
        viewPort.html("<h2 style='color:green'> Absolutely Correct!</h2>");
        viewPort.append("<img src='"+questions[game.currentQuestion].photo1+"'>")
  
        if (game.currentQuestion === questions.length -1) {
          setTimeout(game.results, 3 * 1000);
        }
        else {
          setTimeout(game.nextQuestion, 3 * 1000);
        }
      },

     



      
      reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNum;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
      }
    };
  
    
    $(document).on("click", "#start-over", function() {
      game.reset();
    });
  
    $(document).on('click', ".answer-button", function(e) {
      game.clicked(e);
    });
  
    $(document).on("click", "#start", function() {
      $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counterNum'>25</span> Seconds</h2>");
      game.loadQuestion();
    });
  });