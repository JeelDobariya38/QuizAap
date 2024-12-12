//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const exit_btn = document.querySelector(".info_box").querySelector(".buttons .quit");
const continue_btn = document.querySelector(".info_box").querySelector(".buttons .restart");
const option_list = document.querySelector(".option_list");

// store current session
let timer = undefined;
let currSession = undefined;
let uihandler = new UIHandler();
uihandler.toggleScreen(ScreenType.HOME);

console.log("Session: ", currSession);
console.log("UIHandler: ", uihandler);

// if startQuiz button clicked
start_btn.onclick = ()=>{
    uihandler.toggleScreen(ScreenType.INFO);
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    uihandler.toggleScreen(ScreenType.HOME);
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    currSession = new SessionContext(); //start a new session
    
    uihandler.toggleScreen(ScreenType.QUIZ);
    currSession.changeQuestion();
    uihandler.resetTimeLeftText(timer.timeLimit);
    uihandler.updateQuestion(currSession.questionCount, currSession.currentQuestion);
    uihandler.updateQuestionCounter(currSession.questionCount, currSession.totalQuestionCount);
    timer.start();
}

let timeValue =  15;

const restart_quiz = document.querySelector(".result_box").querySelector(".buttons .restart");
const quit_quiz = document.querySelector(".result_box").querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    currSession = new SessionContext();
    
    uihandler.toggleScreen(ScreenType.QUIZ);
    timeValue = 15;
    currSession.changeQuestion();
    uihandler.updateQuestion(currSession.questionCount, currSession.currentQuestion);
    uihandler.updateQuestionCounter(currSession.questionCount, currSession.totalQuestionCount);
    //timer.reset();
    //timer.start();
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(currSession.questionCount < currSession.totalQuestionCount){ //if question count is less than total question length
        currSession.changeQuestion();
        uihandler.resetTimeLine();
        uihandler.resetTimeLeftText(timer.timeLimit);
        uihandler.updateQuestion(currSession.questionCount, currSession.currentQuestion);
        uihandler.updateQuestionCounter(currSession.questionCount, currSession.totalQuestionCount);
        timer.reset();
        timer.start();
        next_btn.classList.remove("show"); //hide the next button
    } 
    else{
        timer.reset();
        let performanceVector = currSession.calculateUserPerformance();
        uihandler.toggleScreen(ScreenType.RESULT);
        uihandler.updateScoreText(performanceVector, currSession.userScore, currSession.totalQuestionCount);
    }
}

//if user clicked on option
function onOptionSelected(selectedOption){
    timer.interupt();

    let userAns = selectedOption.textContent;
    let isOptionCorrect = currSession.checkAnswer(userAns);
    
    if(isOptionCorrect) {
        currSession.userScore += 1;
    }
    else {
        uihandler.highlightChoice(currSession.currentQuestion.answer, true);
    }
    
    uihandler.highlightChoice(userAns, isOptionCorrect);
    uihandler.disableOptions();
    next_btn.classList.add("show"); //show the next button if user selected any option
}


// ---- Timer Part ---
const OnTimeTicks = (newTime, timeLimit) => {
    uihandler.updateTimeLeftText(timeLimit - newTime);
    uihandler.updateTimeLine(newTime, timeLimit);
};

const OnTimeOff = (newTime) => {
    uihandler.highlightChoice(currSession.currentQuestion.answer, true);
    uihandler.disableOptions();
    next_btn.classList.add("show");
};

timer = new Timer(15, OnTimeTicks, OnTimeOff);
