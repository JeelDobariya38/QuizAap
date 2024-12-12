//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const exit_btn = document.querySelector(".info_box").querySelector(".buttons .quit");
const continue_btn = document.querySelector(".info_box").querySelector(".buttons .restart");
const option_list = document.querySelector(".option_list");

// store current session
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
    startTimer(15); //calling startTimer function
}

let timeValue =  15;
let counter;

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
    clearInterval(counter); //clear counter
    startTimer(timeValue); //calling startTimer function
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
        uihandler.resetTimeLeftText(timer.timeLimit);
        uihandler.updateQuestion(currSession.questionCount, currSession.currentQuestion);
        uihandler.updateQuestionCounter(currSession.questionCount, currSession.totalQuestionCount);
        clearInterval(counter); //clear counter
        startTimer(timeValue); //calling startTimer function
        next_btn.classList.remove("show"); //hide the next button
    } else{
        clearInterval(counter); //clear counter
        
        let performanceVector = currSession.calculateUserPerformance();
        uihandler.toggleScreen(ScreenType.RESULT);
        uihandler.updateScoreText(performanceVector, currSession.userScore, currSession.totalQuestionCount);
    }
}

//if user clicked on option
function onOptionSelected(selectedOption){
    clearInterval(counter); //clear counter

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

function startTimer(time){
    counter = setInterval(timer, 1000);
    
    function timer(){
        time--; //decrement the time value
        uihandler.updateTimeLeftText(time);
        
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            uihandler.highlightChoice(currSession.currentQuestion.answer, true);
            uihandler.disableOptions();
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

let timer = new Timer(15, 
    (newTime) => {
        console.log("Time Update: " + newTime);
        uihandler.updateTimeLine(newTime, 15);
    }, 
    (newTime) => {
        console.log("Timer Over: " + newTime);
    });
timer.start();