var word = $("#enterWord #word-field");
var answerArray = [];
var secretWord = "";
var guessArray = [];
var wordLength = 0;
var incorrect = 0;
var space = 0;

var t1 = {
	name: '',
	score: 0,
	status: '',
	team: 'one'
}
var t2 = {
	name: '',
	score: 0,
	status: '',
	team: 'two'
}

var teamPlaying;
/*	Form Starter
---------------------------------------------------------------------------*/

//Form Elements
var pageStart = $('.page-start'); 
var pageGame = $('.page-game'); 


$(document).on('click', '#submit-team', function(){

	t1.name = $('#team-one').val();
	t2.name = $('#team-two').val();

	t1.status = 'Playing';

	//alert(teamNameOne + ' ' + teamNameTwo);

	pageStart.addClass('animated bounceOutDown');

	setTimeout(function(){
		pageStart.css('display', 'none');
		pageGame.css('display', 'block');
		pageGame.addClass('animated bounceInUp');

		$('.t-1').text($.trim(t1.name) + ': ' + t1.score);
		$('.t-2').text($.trim(t2.name) +': ' + t2.score);

		pageStart.removeClass('animated bounceOutDown');
		pageGame.removeClass('animated bounceInUp');

	},1000);

});

$("#enterWord #submit-word").on("click", function(e) {
  e.preventDefault()

  if($('#word-field').val() != ''){
  		getWord();
		$("#enterWord #word-field").hide();
		$("#enterWord #submit-word").hide();
		$("#playerOne h2").hide();
  }
  else {
  	 	alert('Enter the magic word.');
  }

  $("img").attr("src", "hangman-stage.png");
  $('.alpha span a').css('background', 'transparent');

});

$(".alpha").children().on("click", letterGuess);

$(".alpha").children().on('click', function(){

	$(this).find('a').css('background', '#800000');

});

// prevent refreshing when button or letter is clicked
$(".alpha").on("click", function(e) {
  e.preventDefault();
  //console.log(e);
});


/*---------------------------------------------------------------------------*/

function getWord() {
  secretWord = word.val().toLowerCase();
  letters = secretWord.split('');
    for (i = 0; i < letters.length; i++) {
     
      	//answerArray[i] = " _ ";
      	if(letters[i] == ' '){
			answerArray[i] = '<span class="dsh" style="display: inline-block; margin: 0 5px;"></span>';
	
			space++;
      	}
      	else {
			answerArray[i] = ' _ ';
      	}
      	$(".dashes span.w-l").text(letters.length - space);
      	$(".dashes div").append(answerArray[i]);
    }

}

function letterGuess() {
  	guess = $(this).attr('id'); // a
  	guessArray.push(guess);     // guessArray = a
  	guessCount = guessArray.length; // length 1
    var matches = letters.includes(guess);

    if (matches) {

    	$(".dashes div").html(underscoreify(secretWord, guessArray));

    	var sword = secretWord.replace(/ /g, '');
    	var pGuess = $('.p-answer').text();

    	if(sword == $('.p-answer').text()){

    		
    		if(t1.status == 'Playing'){
				teamPlaying = t1.name;
				t1.score++;
				t1.status = '';
				t2.status = 'Playing';
				alert(teamPlaying + ' Win this round!');
			}
			else if (t2.status == 'Playing'){
				teamPlaying = t2.name;
				t2.score++;
				t2.status = '';
				t1.status = 'Playing';
				alert(teamPlaying + ' Win this round!');
			}

			if(t1.score == 2){
				alert(t1.name + ' Won the game!');

				newGame();
			}
			else if(t2.score == 2){
				alert(t2.name + ' Won the game!');

				newGame();
			}


    		gameReset();

    		$('.t-1').text($.trim(t1.name) + ': ' + t1.score);
			$('.t-2').text($.trim(t2.name) +': ' + t2.score);

    	}
    	else {
    		//console.log('Not yet!');
    	}

    }    
    else {

    	if($('#word-field').val() == ''){
    		alert('Magic Word Empty');
    	}
    	else {
    		incorrect++;
    	}

        if(incorrect == 1){
	    	$("img").attr("src", "06-hangman.png");
	    }
	    else if(incorrect == 2){
	    	$("img").attr("src", "05-hangman.png");
	    }
	    else if(incorrect == 3){
	    	$("img").attr("src", "04-hangman.png");
	    }
	    else if(incorrect == 4){
	    	$("img").attr("src", "03-hangman.png");
	    }
	    else if(incorrect == 5){
	    	$("img").attr("src", "02-hangman.png");
	    }
	    else if(incorrect == 6){

	    	$("img").attr("src", "01-hangman.png");
	    	incorrect = 0;

	    	teamLost();
	    	gameReset();

	    	$('.t-1').text($.trim(t1.name) + ': ' + t1.score);
			$('.t-2').text($.trim(t2.name) +': ' + t2.score);

	    }
        
    }


}

function underscoreify(word, guesses) {
  var underscores = "";
  for (var i = 0; i < word.length; i++) {
      if (guesses.includes(word[i])) {
        underscores = underscores + word[i];
      }
      else {
         
        if(word[i] == ' '){
			underscores = underscores + '<span class="dsh" style="display: inline-block; margin: 0 5px;"></span>';
	  	}
	  	else{ 
	  		underscores = underscores + " _ ";
	  	}
      }
  }
  return underscores;
}

function teamLost(){
	if(t1.status == 'Playing'){
		t1.status = '';
		t2.score++;
		t2.status = 'Playing';
		alert('Game Over! ' + t2.name + ' Win this round!');
	}
	else if(t2.status == 'Playing'){
		t2.status = '';
		t1.score++;
		t1.status = 'Playing';
		alert('Game Over! ' + t1.name + ' Win this round!');
	}

	if(t1.score == 2){
		alert(t1.name + ' Won the game!');

		newGame();
	}
	else if(t2.score == 2){
		alert(t2.name + ' Won the game!');

		newGame();
	}

}

function newGame(){

	$('#team-one').val('');
	$('#team-two').val('');

	$('.page-game').addClass('animated bounceOutDown');

	setTimeout(function(){
		$('.page-start').css('display', 'block');
		$('.page-start').addClass('animated bounceInUp');
		$('.page-game').css('display', 'none');

	},1000);

	t1 = {
		name: '',
		score: 0,
		status: '',
		team: 'one'
	}
	t2 = {
		name: '',
		score: 0,
		status: '',
		team: 'one'
	}
}

function gameReset(){

	$('#word-field').val('');

	$("#enterWord #word-field").show();
  	$("#enterWord #submit-word").show();
  	$("#playerOne h2").show();

  	answerArray = [];
	secretWord = "";
	guessArray = [];
	wordLength = 0;
	incorrect = 0;
	space = 0;

	$('.p-answer').html('');
	$(".dashes span.w-l").text('0');

}



