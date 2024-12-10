//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// store current session
let currSession = undefined;
console.log("Session: ", currSession);

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    currSession = new SessionContext(); //start a new session
    
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    currSession.changeQuestion();
    updateQuetionOnUI(currSession.currentQuestion); //calling updateQuetionOnUI function
    updateQuestionCounterOnUI(currSession.questionCount, currSession.totalQuestionCount);
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    currSession = new SessionContext();
    
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15;
    widthValue = 0;
    currSession.changeQuestion();
    updateQuetionOnUI(currSession.currentQuestion); //calling updateQuetionOnUI function
    updateQuestionCounterOnUI(currSession.questionCount, currSession.totalQuestionCount);
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
        updateQuetionOnUI(currSession.currentQuestion); //calling updateQuetionOnUI function
        updateQuestionCounterOnUI(currSession.questionCount, currSession.totalQuestionCount);
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    } else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

function updateQuetionOnUI(question){
    /* 
    updateQuetionOnUI function, just update question on ui & add necssary event listener to options divs.
    
    Params:
        question: Obj{
            numb: Number,
            questionstr: String,
            options: Array[type: String, length: 4]
        }
    
    Note: doesn;t depend on any external global variable.
    */
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ question.numb + ". " + question.question +'</span>';
    let option_tag = '<div class="option"><span>'+ question.options[0] +'</span></div>'
    + '<div class="option"><span>'+ question.options[1] +'</span></div>'
    + '<div class="option"><span>'+ question.options[2] +'</span></div>'
    + '<div class="option"><span>'+ question.options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "onOptionSelected(this)");
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

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    
    const scoreText = result_box.querySelector(".score_text");
    if (currSession.userScore > currSession.totalQuestionCount/2){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ currSession.userScore +'</p> out of <p>'+ currSession.totalQuestionCount +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(currSession.userScore > currSession.totalQuestionCount/3){ // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>'+ currSession.userScore +'</p> out of <p>'+ currSession.totalQuestionCount +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ currSession.userScore +'</p> out of <p>'+ currSession.totalQuestionCount  +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
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

function updateQuestionCounterOnUI(questionCounter, noOfQuestion){
    /*
    updateQuestionCounterOnUI function, update question count whch at bootom of ui,
    by, creating a new span tag and passing the question number and total question
    
    Params:
        questionCounter: Number,
        noOfQuestion: Number,
    
    Note: doesn;t depend on any external global variable.
    */
    const bottom_ques_counter = document.querySelector("footer .total_que");
    let totalQueCounTag = '<span><p>'+ questionCounter +'</p> of <p>'+ noOfQuestion +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}
