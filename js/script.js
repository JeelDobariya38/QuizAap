//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const exit_btn = document.querySelector(".info_box").querySelector(".buttons .quit");
const continue_btn = document.querySelector(".info_box").querySelector(".buttons .restart");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// store current session
let currSession = undefined;
let uihandler = new UIHandler();
console.log("Session: ", currSession);
console.log("UIHandler: ", uihandler);


// if startQuiz button clicked
start_btn.onclick = ()=>{
    uihandler.toggleScreen(ScreenType.INFO);
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    uihandler.toggleScreen(ScreenType.BLANK);
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    currSession = new SessionContext(); //start a new session
    
    uihandler.toggleScreen(ScreenType.QUIZ);
    currSession.changeQuestion();
    uihandler.updateQuestion(currSession.questionCount, currSession.currentQuestion);
    uihandler.updateQuestionCounter(currSession.questionCount, currSession.totalQuestionCount);
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = document.querySelector(".result_box").querySelector(".buttons .restart");
const quit_quiz = document.querySelector(".result_box").querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    currSession = new SessionContext();
    
    uihandler.toggleScreen(ScreenType.QUIZ);
    timeValue = 15;
    widthValue = 0;
    currSession.changeQuestion();
    uihandler.updateQuestion(currSession.questionCount, currSession.currentQuestion);
    uihandler.updateQuestionCounter(currSession.questionCount, currSession.totalQuestionCount);
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
// const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(currSession.questionCount < currSession.totalQuestionCount){ //if question count is less than total question length
        currSession.changeQuestion();
        uihandler.updateQuestion(currSession.questionCount, currSession.currentQuestion);
        uihandler.updateQuestionCounter(currSession.questionCount, currSession.totalQuestionCount);
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    } else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        
        let performanceVector = currSession.calculateUserPerformance();
        uihandler.toggleScreen(ScreenType.RESULT);
        uihandler.updateScoreText(performanceVector, currSession.userScore, currSession.totalQuestionCount);
    }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function onOptionSelected(selectedOption){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    
    let userAns = selectedOption.textContent; //getting user selected option
    const allOptions = option_list.children.length; //getting all option items
    
    if(currSession.checkAnswer(userAns)){ //if user selected option is equal to array's correct answer
        currSession.userScore += 1; //upgrading score value with 1
        selectedOption.classList.add("correct"); //adding green color to correct selected option
        selectedOption.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + currSession.userScore);
    }else{
        selectedOption.classList.add("incorrect"); //adding red color to correct selected option
        selectedOption.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == currSession.currentQuestion.answer){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == currSession.currentQuestion.answer){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}
