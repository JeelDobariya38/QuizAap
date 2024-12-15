//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const exit_btn = document.querySelector(".info_box").querySelector(".buttons .quit");
const continue_btn = document.querySelector(".info_box").querySelector(".buttons .restart");
const restart_quiz = document.querySelector(".result_box").querySelector(".buttons .restart");
const quit_quiz = document.querySelector(".result_box").querySelector(".buttons .quit");
const next_btn = document.querySelector("footer .next_btn");

// if startQuiz button clicked
start_btn.onclick = () => {
    controller.displayQuizInfo();
}

// if exitQuiz button clicked
exit_btn.onclick = () => {
    controller.goToHomepage();
}

// if continueQuiz button clicked
continue_btn.onclick = () => { 
    controller.startQuiz();
}

// if restartQuiz button clicked
restart_quiz.onclick = () => { 
    controller.startQuiz();
}

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    controller.reloadApp(); //reload the current window
}


// if Next Que button clicked
next_btn.onclick = () => {
    if(controller.currSession.questionCount < controller.currSession.totalQuestionCount){ //if question count is less than total question length
        controller.nextQuestion();
    } 
    else{
        controller.submitQuiz();
    }
}

//if user clicked on option
function onOptionSelected(selectedOption) {
    controller.timer.interupt();
    answerQuestion(selectedOption.textContent);
}

// ---- Contoller Part ---
const controller = new Controller(new Timer(15, 
                                    (newTime, timeLimit) => {
                                        controller.uihandler.updateTimeLeftText(timeLimit - newTime);
                                        controller.uihandler.updateTimeLine(newTime, timeLimit);
                                    }, 
                                    (newTime) => {
                                        controller.uihandler.highlightChoice(currSession.currentQuestion.answer, true);
                                        controller.uihandler.disableOptions();
                                        controller.next_btn.classList.add("show");
                                    }));
controller.startApp();
