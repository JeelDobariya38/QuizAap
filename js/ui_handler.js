class InvalidEnumValueError extends Error {
    constructor (valuePassed, enumObjName) {
        super();
        this.message = `Error: Value (${valuePassed}) passed is not a valid value in "${enumObjName}" Enum`;
    }
}

/*
ScreenTypes is emun that is liable,
to represent all the screens/views types/layouts in entire website.
*/
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
            - screenType: Enum[ScreenTypes],
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
            throw new InvalidEnumValueError(screenType, "ScreenTypes");
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
    
    updateScoreText(userPerformanceVector, userScore, noOfQuestion) {
        /*
        updateScoreText function, update the result text on result screen.
        
        Params:
            - userPerformanceVector: Enum[PerformanceVector],
            - userScore: Number,
            - noOfQuestion: Number,
        */
        
        let scoreTextHTML;
        
        if (userPerformanceVector == PerformanceVector.EXPONENTIAL) {
            scoreTextHTML = `Congrats! 🌟🌟, You have got all of ${noOfQuestion} correctly!!!`;
        }
        else if (userPerformanceVector == PerformanceVector.EXCELLENT) {
            scoreTextHTML = `Excellent! 🎓, You have got majority questions correctly, out of ${noOfQuestion}!!!`;
        }
        else if (userPerformanceVector == PerformanceVector.GREAT) {
            scoreTextHTML = `Congrats! 🎉, You got ${userScore} out of ${noOfQuestion} correctly!!!`;
        }
        else if (userPerformanceVector == PerformanceVector.GOOD) {
            scoreTextHTML = `Nice 😎, You got ${userScore} out of ${noOfQuestion} correctly!!!`;
        }
        else if (userPerformanceVector == PerformanceVector.BAD) {
            scoreTextHTML = `Sorry 😐, You got only ${userScore} out of ${noOfQuestion} correctly!!!`;
        } 
        else if (userPerformanceVector == PerformanceVector.POOR) {
            scoreTextHTML = `Unfortunately 😐, You have got majority incorrectly!!!, but failure are part of successfull journey!!`;
        }
        else if (userPerformanceVector == PerformanceVector.ZERO) {
            scoreTextHTML = `Unfortunately 😞, You have got none out of the ${noOfQuestion} correctly, Better luck next time!!!`
        }
        else {
            throw new InvalidEnumValueError(userPerformanceVector, "PerformanceVector");
        }
        
        this.scoreTextElem.innerHTML = "<span style='text-align: center'><p>" + scoreTextHTML + "</p></span>";
    }
}
