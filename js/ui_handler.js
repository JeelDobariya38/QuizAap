class InvalidScreenTypeError extends Error {
    constructor () {
        super("valid ScreenTypes must be passed!!");
    }
}

const ScreenTypes = Object.freeze({
    BLANK: 0,
    INFO: 1,
    QUIZ: 2,
    RESULT: 3
});

class UIHandler {
    /*
    UIHandler class is responsible for ui updation and user interaction handling.
    
    - toogleScreen(): for switching screens
    */
    
    constructor() {
        this.infoBoxElem = document.querySelector(".info_box");
        this.quizBoxElem = document.querySelector(".quiz_box");
        this.resultBoxElem = document.querySelector(".result_box");
        this.bottomQuesCounterElem = document.querySelector("footer .total_que");
        this.scoreTextElem = document.querySelector(".result_box").querySelector(".score_text");
    }
    
    toggleScreen(screenType) {
        /*
        toggleScreen function is use to toogle between screen.
        
        Params:
            - screenType: ScreenTypes,
        */
        
        this.infoBoxElem.classList.remove("activeInfo");
        this.quizBoxElem.classList.remove("activeQuiz");
        this.resultBoxElem.classList.remove("activeResult");
        
        if (screenType == ScreenTypes.INFO) {
            this.infoBoxElem.classList.add("activeInfo");
        } 
        else if (screenType == ScreenTypes.QUIZ) {
            this.quizBoxElem.classList.add("activeQuiz");
        }
        else if (screenType == ScreenTypes.RESULT) {
            this.resultBoxElem.classList.add("activeResult");
        }
        else {
            throw new InvalidScreenTypeError();
        }
    }
    
    updateQuestion(questionNumber, questionObj) {
        /* 
        updateQuestion function, just update question on ui & add necssary event listener to options divs.
        
        Params:
            - questionNumber: Number,
            - questionObj: Object{
                questionstr: String,
                options: Array[type: String, length: 4]
              }
        */
        
        const que_text = document.querySelector(".que_text");

        //creating a new span and div tag for question and option and passing the value using array index
        let que_tag = '<span>'+ questionNumber + ". " + questionObj.question +'</span>';
        let option_tag = '<div class="option"><span>'+ questionObj.options[0] +'</span></div>'
        + '<div class="option"><span>'+ questionObj.options[1] +'</span></div>'
        + '<div class="option"><span>'+ questionObj.options[2] +'</span></div>'
        + '<div class="option"><span>'+ questionObj.options[3] +'</span></div>';
        que_text.innerHTML = que_tag; //adding new span tag inside que_tag
        option_list.innerHTML = option_tag; //adding new div tag inside option_tag
        
        const option = option_list.querySelectorAll(".option");

        // set onclick attribute to all available options
        for(let i=0; i < option.length; i++){
            option[i].setAttribute("onclick", "onOptionSelected(this)");
        }
    }
    
    updateQuestionCounter(questionCounter, noOfQuestion) {
        /*
        updateQuestionCounterOnUI function, update question count which at bootom of ui,
        by, creating a new span tag and passing the question number and total question.
        
        Params:
            - questionCounter: Number,
            - noOfQuestion: Number,
        */
        
        let totalQueCounTag = '<span><p>'+ questionCounter +'</p> of <p>'+ noOfQuestion +'</p> Questions</span>';
        this.bottomQuesCounterElem.innerHTML = totalQueCounTag;
    }
    
    updateScoreText(userScore, noOfQuestion) {
        /*
        updateScoreText function, update the result text on result screen.
        
        Params:
            - userScore: Number,
            - noOfQuestion: Number,
        */
        
        let scoreTextHTML;
        
        if (userScore == noOfQuestion) {
            scoreTextHTML = `congrats! 🎉, You have got all of them correctly!!!`;
        }
        else if (userScore > noOfQuestion/2){
            scoreTextHTML = `congrats! 🎉, You got <p>${userScore}</p> out of <p>${noOfQuestion}</p>`;
        }
        else if(userScore > currSession.totalQuestionCount/3){
            scoreTextHTML = `nice 😎, You got <p>${userScore}</p> out of <p>${noOfQuestion}</p>`;
        }
        else {
            scoreTextHTML = `sorry 😐, You got only <p>${userScore}</p> out of <p>${noOfQuestion}</p>`;
        }
        
        this.scoreTextElem.innerHTML = `<span style='text-align: center'>and ${scoreTextHTML}</span>`;
    }
}
