// Prevent accidental page leave ---------------------------------------------------------------------------------------------

saveTopicButton = false;
editMode = false;

// Confirm page leave
window.onbeforeunload = function() {
	if (!saveTopicButton && editMode) { // If no errors and leaving page without saving button
		return 'If you leave without saving, you will lose your topic.';
	}
};

// Editor functions ----------------------------------------------------------------------------------------------------------

function createEditor(number) {
	$('.questionToolbar .toolbarContainer').append(newToolbar('toolbarQ' + number));
	$('.questionToolbar .toolbarContainer').append(newToolbar('toolbarA' + number));

	eval('questionEditor' + number + ' = new wysihtml5.Editor(\'question' + number + '\', {toolbar: \'toolbarQ' + number + '\', parserRules: wysihtml5ParserRules, pasteParserRulesets: wysihtml5ParserRules, showToolbarAfterInit: false, handleTabKey: false})');
	eval('answerEditor' + number + ' = new wysihtml5.Editor(\'answer' + number + '\', {toolbar: \'toolbarA' + number + '\', parserRules: wysihtml5ParserRules, pasteParserRulesets: wysihtml5ParserRules, showToolbarAfterInit: false, handleTabKey: false})');

	showPlaceholder(number);

	if ($('section').eq(0).hasClass('topicOverview')) {
		setTimeout(function() {
			$('.topicText').attr('contenteditable', false);
			$('.topicText').removeClass('unclickable');
		});
	}
}


function newToolbar(id) {
	return '<div class="toolbar" id="' + id + '">' +
	'<svg class="boldButton" data-wysihtml5-command="bold" viewBox="0 0 71.4 71.4">' +
	'	<path d="M53.8,39.4c-1.7-2.3-4.3-3.9-7.8-4.7c6-1.9,9-5.6,9-11.1c0-2.7-0.7-5-2.1-7c-1.4-1.9-3.1-3.4-5.2-4.4c-2.1-1-5.2-1.5-9.4-1.5H15.1v50h23.3c6.4,0,11-1.4,13.8-4.1c2.8-2.7,4.2-6,4.2-9.7C56.4,44.2,55.5,41.7,53.8,39.4z M26.7,19.6h8c2.4,0,4.1,0.1,4.9,0.4s1.6,0.8,2.3,1.7c0.7,0.9,1,2,1,3.3c0,1.2-0.4,2.4-1.3,3.7c-0.8,1.3-2.9,1.9-6.1,1.9h-8.9V19.6z M42.2,49.8c-1.3,1.1-3.4,1.6-6.5,1.6h-9V39.4h9.5c2.8,0,4.8,0.6,6.1,1.8c1.2,1.2,1.8,2.6,1.8,4.2C44.1,47.3,43.5,48.8,42.2,49.8z">' +
	'</svg>\n' +
	'<svg class="italicButton" data-wysihtml5-command="italic" viewBox="0 0 71.4 71.4">' +
	'	<polygon points="17.6,60.7 18.7,53.6 27.9,53.6 33.1,17.8 23.6,17.8 24.7,10.7 53.9,10.7 52.8,17.8 42.9,17.8 37.7,53.6 47.9,53.6 46.8,60.7">' +
	'</svg>\n' +
	'<svg class="subscriptButton" data-wysihtml5-command="subscript" viewBox="0 0 71.4 71.4">' +
	'	<path d="M3.1,10.7h39.8v8.8H28v41.2H17.9V19.6H3.1V10.7z"/>' +
	'	<path d="M47.4,56.5l11.3-11c1.8-1.8,2.3-2.9,2.3-4.7c0-2.3-1.8-4.2-4.7-4.2c-3,0-5,1.8-6.5,2.9l-3.1-4.7c0,0,3.7-3.9,10.2-3.9c7.1,0,11,4.2,11,9.2c0,3.1-0.9,5.4-3.3,7.8l-7.9,7.7h11.6v5.1H47.4V56.5z"/>' +
	'</svg>\n' +
	'<svg class="superscriptButton" data-wysihtml5-command="superscript" viewBox="0 0 71.4 71.4">' +
	'	<path d="M3.1,10.7h39.8v8.8H28v41.2H17.9V19.6H3.1V10.7z"/>' +
	'	<path d="M47.4,36.3l11.3-11c1.8-1.8,2.3-2.9,2.3-4.7c0-2.3-1.8-4.2-4.7-4.2c-3,0-5,1.8-6.5,2.9l-3.1-4.7c0,0,3.7-3.9,10.2-3.9c7.1,0,11,4.2,11,9.2c0,3.1-0.9,5.4-3.3,7.8l-7.9,7.7h11.6v5.1H47.4V36.3z"/>' +
	'</svg>\n' +
	'<svg class="linkButton" data-wysihtml5-command="createLink" viewBox="0 0 71.4 71.4">' +
	' <path d="M56.8,33.4l-9.4,9.4c-5.2,5.2-13.6,5.2-18.8,0c-0.8-0.8-1.5-1.7-2-2.7l4.4-4.4c0.2-0.2,0.5-0.3,0.7-0.5c0.3,1,0.8,2,1.6,2.8c2.6,2.6,6.8,2.6,9.4,0l9.4-9.4c2.6-2.6,2.6-6.8,0-9.4c-2.6-2.6-6.8-2.6-9.4,0l-3.3,3.3c-2.7-1.1-5.6-1.3-8.5-0.9l7.1-7.1c5.2-5.2,13.6-5.2,18.8,0C62,19.8,62,28.2,56.8,33.4z M32,48.8l-3.3,3.3c-2.6,2.6-6.8,2.6-9.4,0s-2.6-6.8,0-9.4l9.4-9.4c2.6-2.6,6.8-2.6,9.4,0c0.8,0.8,1.3,1.8,1.6,2.8c0.2-0.1,0.5-0.3,0.7-0.5l4.4-4.4c-0.6-0.9-1.2-1.9-2-2.7c-5.2-5.2-13.6-5.2-18.8,0l-9.4,9.4c-5.2,5.2-5.2,13.6,0,18.8c5.2,5.2,13.6,5.2,18.8,0l7.1-7.1C37.6,50.1,34.7,49.9,32,48.8z">' +
	'</svg>\n' +
	'<svg class="bulletButton" data-wysihtml5-command="insertUnorderedList" viewBox="0 0 71.4 71.4">' +
	'	<circle cx="12.8" cy="17" r="6.3"/>' +
	'	<circle cx="12.8" cy="35.5" r="6.3"/>' +
	'	<circle cx="12.8" cy="54.5" r="6.3"/>' +
	'	<path d="M25.2,21.4h38.4c0.3,0,0.7-0.1,0.9-0.4c0.2-0.2,0.4-0.5,0.4-0.9v-6.3c0-0.7-0.6-1.2-1.3-1.2H25.2c-0.7,0-1.3,0.6-1.3,1.2v6.3C23.9,20.8,24.5,21.4,25.2,21.4z"/>' +
	'	<path d="M63.6,31.1H25.2c-0.7,0-1.3,0.6-1.3,1.2v6.3c0,0.7,0.6,1.2,1.3,1.2h38.4c0.3,0,0.7-0.1,0.9-0.4c0.2-0.2,0.4-0.5,0.4-0.9v-6.3C64.9,31.6,64.3,31.1,63.6,31.1z"/>' +
	'	<path d="M63.6,50.1H25.2c-0.7,0-1.3,0.6-1.3,1.2v6.3c0,0.7,0.6,1.2,1.3,1.2h38.4c0.3,0,0.7-0.1,0.9-0.4c0.2-0.2,0.4-0.5,0.4-0.9v-6.3C64.9,50.6,64.3,50.1,63.6,50.1z"/>' +
	'</svg>\n' +
	'<svg class="imageButton" data-wysihtml5-command="insertImage" viewBox="0 0 71.4 71.4">' +
	'	<path d="M10.7,10.7l0,50h50l0-50H10.7z M55.2,16.2l0,32.1l-9.5-11.4l-7.3,7.7L26.6,30.5L16.2,46.8l0-30.5H55.2z"/>' +
	'	<path d="M41.2,30.4c2.2,0,4-1.8,4-4s-1.8-4-4-4c-2.2,0-4,1.8-4,4C37.2,28.6,39,30.4,41.2,30.4z"/>' +
	'</svg>\n' +
	' <div class="toolbarDialog linkDialog" data-wysihtml5-dialog="createLink" style="display: none;">' +
	' 	<input type="text" id="linkURL" name="link" class="textBox" placeholder="Enter a link" autocomplete="off" data-wysihtml5-dialog-field="href" tabindex="-1">' +
	' 	<button type="button" data-wysihtml5-dialog-action="save">Add</button>' +
	' </div>' +
	' <div class="toolbarDialog imageDialog" data-wysihtml5-dialog="insertImage" style="display: none;">' +
	' 	<input type="text" id="imageURL" name="link" class="textBox" placeholder="Enter an image link" autocomplete="off" data-wysihtml5-dialog-field="src" tabindex="-1">' +
	' 	<button type="button" data-wysihtml5-dialog-action="save">Add</button>' +
	' </div>' +
	'</div>';
}


function noToolbar() {
	if (mobileDisplay()) {
		$('.questionToolbar').slideUp(50);
	}
	else {
		$('.dummyToolbar').show();
	}
}


function newQuestion(number) {
	return '<div class="editor" id="editor' + number + '" data-question="' + number + '" style="display: none;">' +
	'	<ul class="questionBar small-block-grid-3" id="questionBar' + number + '">' +
	'		<li>' +
	'			<div class="questionSortHandlerContainer">' +
	'				<svg class="questionSortHandle" viewBox="0 0 100 100">' +
	'					<path d="M93.2,3.9H-0.4c-1.8,0-3.2,1-3.2,2.3v10.3c0,1.3,1.4,2.3,3.2,2.3h93.5c1.8,0,3.2-1,3.2-2.3V6.2C96.4,5,95,3.9,93.2,3.9z"/>' +
	'					<path d="M93.2,38.9H-0.4c-1.8,0-3.2,1-3.2,2.3v10.3c0,1.3,1.4,2.3,3.2,2.3h93.5c1.8,0,3.2-1,3.2-2.3V41.2C96.4,40,95,38.9,93.2,38.9z"/>' +
	'					<path d="M93.2,73.9H-0.4c-1.8,0-3.2,1-3.2,2.3v10.3c0,1.3,1.4,2.3,3.2,2.3h93.5c1.8,0,3.2-1,3.2-2.3V76.2C96.4,75,95,73.9,93.2,73.9z"/>' +
	'				</svg>' +
	'   	</div>' +
	'			<p class="questionNumber" id="number' + number + '">#' + number + '</p>' +
	'		</li>' +
	'		<li>' +
	'			<svg class="addQuestion" data-question="' + number + '" id="addQuestion' + number + '" viewBox="0 0 292.8 292.6">' +
	'				<path d="M177.8,201.7v-23.8h43.5l63.2,0c4.6,0,8.3-3.7,8.3-8.3v-46.3c0-4.6-3.8-8.4-8.4-8.4h-78h-28.6V86.7l-0.1-78.4c0-4.6-3.7-8.3-8.3-8.3l-46.3,0c-4.6,0-8.3,3.7-8.3,8.3v71.9l0,34.8l-36.8,0l-69.8-0.1c-4.6,0-8.3,3.7-8.3,8.3l0,46.2c0,4.6,3.7,8.3,8.3,8.3h75.5h31.1v29.4l0,77.2c0,4.6,3.7,8.3,8.3,8.3l46.2,0c4.6,0,8.3-3.7,8.3-8.3L177.8,201.7z"/>' +
	'			</svg>' +
	'		</li>' +
	'		<li class="deleteQuestionContainer">' +
	'			<svg class="deleteQuestion" data-question="' + number + '" id="deleteQuestion' + number + '" viewBox="0 0 469.4 469.4">' +
	'				<path d="M310.4,235.1L459.9,85.5c12.5-12.5,12.5-33,0-45.7L429.4,9.4c-12.5-12.5-33-12.5-45.7,0L234.3,159L85.6,10.3c-12.5-12.5-33-12.5-45.7,0L9.5,40.8C-3,53.3-3,73.7,9.5,86.4l148.6,148.6L9.7,383.5c-12.5,12.5-12.5,33,0,45.7l30.4,30.4c12.5,12.5,33,12.5,45.7,0l148.5-148.4L383.1,460c12.5,12.5,33,12.5,45.7,0l30.4-30.4c12.5-12.5,12.5-33,0-45.7L310.4,235.1z"/>' +
	'			</svg>' +
	'		</li>' +
	'	</ul>' +
	'	<div class="row">' +
	'		<div class="small-12 medium-6 columns">' +
	'			<div id="question' + number + '" class="topicText questionTopicText mousetrap" number="' + number + '">' +
	'			</div>' +
	'		</div>' +
	'		<div class="small-12 medium-6 columns">' +
	'			<div id="answer' + number + '" class="topicText answerTopicText mousetrap" number="' + number + '">' +
	'			</div>' +
	'		</div>' +
	'	</div>' +
	'</div>';
}


function showPlaceholder(number) {
  if ( eval('questionEditor' + number + '.getValue()') === '' ) {
		var question = $('#question' + number);
    question.html(' ');
    question.html('');
  }
  if ( eval('answerEditor' + number + '.getValue()') === '' ) {
		var answer = $('#answer' + number);
    answer.html(' ');
    answer.html('');
  }
}


// Changes the quesitons number shown to user so that they are in order
// Note that the question numbers used by Javascript will be different
function fixQuestionNumbers() {
	$('.editor').each(function(number, object) {
		++number;
		$(object).find('.questionNumber').html('#' + number);
	});
}


function scrollTop() {
  $('html, body').animate({
      scrollTop: $('body').offset().top
  }, 500);
}


function addQuestion(number, button) {
	// Prevent number of questions exceeding 100
  if ($('div.editor').length === 100) {
    $('.topicSizeError').html('A topic cannot have more than 100 questions.');
    scrollTop();
		return null;
  }
  $('.topicSizeError').html('');

  ++questionNumber;
  var question = newQuestion(questionNumber);

	// Add question and answer format toolbars
	$('.toolbarContainer').append(newToolbar('toolbarQ' + questionNumber));
	$('.toolbarContainer').append(newToolbar('toolbarA' + questionNumber));

	if (button) {
		// If add question button was pressed, then add question to the end of the
		// page.
		$(editableList.el).append(question);

		$('#editor' + questionNumber).slideDown(50, function() {
			// Move page down as question is added to end of page
			$('html, body').animate({
		      scrollTop: $(window).scrollTop() + $('#editor' + questionNumber).height()
		  }, 300);
		});
	}
	else {
		// If the add question button on a question was pressed, then add a question
		// before that question.
		$(question).insertBefore('#editor' + number).slideDown(100);
		$(editableList.el);

		$('#editor' + questionNumber).focus();
		fixQuestionNumbers();
	}

	// Initiate question & answer WYSIHTML editors
  eval('questionEditor' + questionNumber + ' = new wysihtml5.Editor(\'question' + questionNumber + '\', {toolbar: \'toolbarQ' + questionNumber + '\', parserRules: wysihtml5ParserRules, pasteParserRulesets: wysihtml5ParserRules, handleTabKey: false})');
  eval('answerEditor' + questionNumber + ' = new wysihtml5.Editor(\'answer' + questionNumber + '\', {toolbar: \'toolbarA' + questionNumber + '\', parserRules: wysihtml5ParserRules, pasteParserRulesets: wysihtml5ParserRules, handleTabKey: false})');
  showPlaceholder(questionNumber);

}


function deleteQuestion(number) {
	var editor = $('#editor' + number);

	// This is not put in CSS since transitions are used for Sortable.js fallback
  editor.css('transition-duration', '150ms');

  editor.css('transform', 'translateX(-150%)');
	setTimeout(function() {
		editor.slideUp(200, function() {
			editor.remove();
			fixQuestionNumbers();
		});
	}, 50);

	$('#toolbarQ' + number).remove();
	$('#toolbarA' + number).remove();
};


$('.addQuestionButton').click(function() {
	var question = $(this).attr('data-question');
	addQuestion(question, button=true);
});

// .on(); is used instead of .click(); because question editors are added to
// the HTML so using .click(); would only listen to editors created before this
// event listener was created.
$('body').on('click', '.addQuestion, .deleteQuestion', function() {
	var question = $(this).attr('data-question');

	if ($(this).is('.addQuestion')) {
		addQuestion(question, button=false);
	}
	else if ($(this).is('.deleteQuestion')) {
		deleteQuestion(question);
	}
});

// Validate data and save topic
$('button.saveTopic').click(function() {
  var total = $('.editor').length; // Get number of questions
  var error = false;

	var topicError = $('.topicError');
	topicError.html('');

	var topicName = $('.topicName').val(); // Get topic name

  // Topic name validation
  if (topicName.trim() === '') { // If topic name is empty
    topicError.html('Please enter a name for your topic.');
    error = true;

  } else if (charCheck(topicName)) { // If topic name has at least 1 number or letter
    topicError.html('Topic names must contain at least one letter or number.');
    scrollTop();
    error = true;

  } else if (jQuery.inArray(topicName.toLowerCase(), topicList) > -1) { // If topic name exists
    topicError.html('You already have a topic with this name.');
    scrollTop();
    error = true;
  }

  // Question validation
  if (total < 2) { // If at least 3 questions
    topicError.html('A topic must include a minimum of two questions.');
    error = true;
  } else if (total > 100) { // If more than 100 questions
    topicError.html('A topic cannot have more than 100 questions.');
    error = true;
  }

  // If any empty questions
	$('.editor').each(function() {
		var number = $(this).attr('data-question');
		eval('var questionContent = questionEditor' + number + '.getValue()');

		if (questionContent === '') {
      topicError.html('Please don\'t leave any questions blank.');
      error = true;
		}
	});

  // Create form and send to server if no errors
  if (!error) {
		i = 1
		$('.editor').each(function() {
			var number = $(this).attr('data-question');
			// Get parsed value of question & answer editors
			eval('var questionContent' + number + '= questionEditor' + number + '.getValue()');
      eval('var answerContent' + number + '= answerEditor' + number + '.getValue()');

      // Add textarea to form
      $('#sendTopicForm').append('<textarea name="question' + i + '" id="questionTextarea' + i + '">');
      $('#sendTopicForm').append('<textarea name="answer' + i + '" id="answerTextarea' + i + '">');

      // Add content to textareas
      $('#questionTextarea' + i).val(eval('questionContent' + number));
      $('#answerTextarea' + i).val(eval('answerContent' + number));

			i += 1
		});

		// Prevent page leave confirmation
    saveTopicButton = true;
    $('#sendTopicForm').submit();
  }
	else {
		scrollTop();
		return false;
	}
});

// Keyboard Shortcuts --------------------------------------------------------------------------------------------------------

// Subscript
Mousetrap.bind(['command+[', 'ctrl+['], function(e) {
	if ($('.questionTopicText').is(':focus')) {
		var number = $(':focus').attr('number');
    eval('questionEditor' + number + '.composer.commands.exec(\'subscript\')');
	}

  if ($('.answerTopicText').is(':focus')) {
		var number = $(':focus').attr('number');
		eval('answerEditor' + number + '.composer.commands.exec(\'subscript\')');
	}
  return false;
});

// Superscript
Mousetrap.bind(['command+]', 'ctrl+]'], function(e) {
	if ($('.questionTopicText').is(':focus')) {
		var number = $(':focus').attr('number');
    eval('questionEditor' + number + '.composer.commands.exec(\'superscript\')');
	}

  if ($('.answerTopicText').is(':focus')) {
		var number = $(':focus').attr('number');
		eval('answerEditor' + number + '.composer.commands.exec(\'superscript\')');
	}
  return false;
});

// Link
// Mousetrap.bind(['command+k', 'ctrl+k'], function(e) {
// 	if ($('.questionTopicText').is(':focus')) {
// 		var number = $(':focus').attr('number');
//     eval('questionEditor' + number + '.composer.commands.exec(\'createLink\')');
// 	}
//
//   if ($('.answerTopicText').is(':focus')) {
// 		var number = $(':focus').attr('number');
// 		eval('answerEditor' + number + '.composer.commands.exec(\'createLink\')');
// 	}
//   return false;
// });

// Bullet List
Mousetrap.bind(['command+u', 'ctrl+u'], function(e) {
	if ($('.questionTopicText').is(':focus')) {
		var number = $(':focus').attr('number');
    eval('questionEditor' + number + '.composer.commands.exec(\'insertUnorderedList\')');
	}

  if ($('.answerTopicText').is(':focus')) {
		var number = $(':focus').attr('number');
		eval('answerEditor' + number + '.composer.commands.exec(\'insertUnorderedList\')');
	}
  return false;
});

// Image
// Mousetrap.bind(['command+m', 'ctrl+m'], function(e) {
// 	if ($('.questionTopicText').is(':focus')) {
// 		var number = $(':focus').attr('number');
//     eval('questionEditor' + number + '.composer.commands.exec(\'insertImage\')');
// 	}
//
//   if ($('.answerTopicText').is(':focus')) {
// 		var number = $(':focus').attr('number');
// 		eval('answerEditor' + number + '.composer.commands.exec(\'insertImage\')');
// 	}
//   return false;
// });

// Add Question
Mousetrap.bind(['command+enter', 'ctrl+enter'], function(e) {
	if ($(':focus').hasClass('questionTopicText')) {
		var number = $('.questionTopicText:focus').attr('number');
		eval('questionEditor' + number + '.composer.commands.exec("undo")');
	}

  if ($(':focus').hasClass('answerTopicText')) {
		var number = $('.answerTopicText:focus').attr('number');
    eval('answerEditor' + number + '.composer.commands.exec("undo")');
	}
	addQuestion(0, true);
  return false;
});

// Delete Question
Mousetrap.bind(['command+backspace', 'ctrl+backspace'], function(e) {
  if ($(':focus').hasClass('questionTopicText')) {
		var number = $('.questionTopicText:focus').attr('number');
		// trigger() is used so that WYSIHTML correctly removes the editors
		$('#deleteQuestion' + number).trigger('click');
	}

  if ($(':focus').hasClass('answerTopicText')) {
		var number = $('.answerTopicText:focus').attr('number');
		// trigger() is used so that WYSIHTML correctly removes the editors
    $('#deleteQuestion' + number).trigger('click');
	}

	noToolbar()

  return false;
});
