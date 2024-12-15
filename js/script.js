//selecting all required elements
const startBtn = document.querySelector(".start_btn button");
const exitBtn = document.querySelector(".info_box").querySelector(".buttons .quit");
const continueBtn = document.querySelector(".info_box").querySelector(".buttons .restart");
const restartQuizBtn = document.querySelector(".result_box").querySelector(".buttons .restart");
const quitQuizBtn = document.querySelector(".result_box").querySelector(".buttons .quit");
const nextQuestionBtn = document.querySelector("footer .next_btn");


startBtn.onclick = () => controller.displayQuizInfo();
exitBtn.onclick = () => controller.goToHomepage();
continueBtn.onclick = () => controller.startQuiz();
restartQuizBtn.onclick = () => controller.startQuiz();
quitQuizBtn.onclick = () => controller.reloadApp();
nextQuestionBtn.onclick = () => {
    if(controller.currSession.hasNextQuestion()){
        controller.nextQuestion();
    } 
    else{
        controller.submitQuiz();
    }
}

//if user clicked on option
function onOptionSelected(selectedOption) {
    controller.timer.interupt();
    controller.answerQuestion(selectedOption.textContent);
}

// ----- Contoller Part -----
const controller = new Controller();
controller.startApp();
