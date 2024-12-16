class UIHandler {
    /*
    UIHandler class is responsible for ui updation.
    
    Methods:
        - toogleScreen(): for switching screens on ui.
        - updateQuestion(): for updating curr question with new question on quiz ui.
        - updateQuestionCounter(): for updating question count on quiz ui.
        - highlightChoice(): for highlighting option on quiz ui.
        - disableOptions(): for disabling the option on quiz ui.
        - updateTimeLeftText(): for updating timer/time-left text on quiz ui.
        - resetTimeLeftText(): for reseting timer/time-left text on quiz ui.
        - updateTimeLine(): for updateing the timeline on quiz ui.
        - resetTimeLine(): for reseting the timeline on quiz ui.
        - updateScoreText(): for updating score text on result ui.
    */
    static tickIconTagHTML = '<div class="icon tick"><i class="fas fa-check"></i></div>';
    static crossIconTagHTML = '<div class="icon cross"><i class="fas fa-times"></i></div>';
    
    constructor() {
        // screens
        this.homeScreenElem = document.querySelector("#home-screen");
        this.infoScreenElem = document.querySelector("#info-screen");
        this.quizScreenElem = document.querySelector("#quiz-screen");
        this.resultScreenElem = document.querySelector("#result-screen");
        
        // other html
        this.options = [];
        this.timeTextElem = document.querySelector(".timer .time_left_txt");
        this.timeCountElem = document.querySelector(".timer .timer_sec");
        this.timeLineElem = document.querySelector("header .time_line");
        this.optionListElem = document.querySelector(".option_list");
        this.nextBtnElem = document.querySelector("footer .next_btn");
        this.bottomQuesCounterElem = document.querySelector("footer .total_que");
        this.scoreTextElem = document.querySelector(".result_box").querySelector(".score_text");
    }
    
    toggleScreen(screenType) {
        /*
        toggleScreen function is use to toogle between different screen.
        
        Params:
            - screenType: Enum[ScreenTypes],
        */
        
        this.homeScreenElem.classList.remove("active");
        this.infoScreenElem.classList.remove("active");
        this.quizScreenElem.classList.remove("active");
        this.resultScreenElem.classList.remove("active");
        
        if (screenType == ScreenType.HOME) {
            this.homeScreenElem.classList.add("active");
        }
        else if (screenType == ScreenType.INFO) {
            this.infoScreenElem.classList.add("active");
        } 
        else if (screenType == ScreenType.QUIZ) {
            this.quizScreenElem.classList.add("active");
        }
        else if (screenType == ScreenType.RESULT) {
            this.resultScreenElem.classList.add("active");
        }
        else {
            throw new InvalidEnumValueError(screenType, "ScreenType");
        }
    }
    
    updateNextBtnVisiblity(visibile) {
        /* 
        updateNextBtnVisiblity function, changes next btn visiblity based on visibile paramater.
        
        Params:
            - visibile: Boolean,
        */
        if (visibile) this.nextBtnElem.classList.add("show");
        else this.nextBtnElem.classList.remove("show");
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

        let que_tag = '<span>'+ questionNumber + ". " + questionObj.question +'</span>';
        let option_tag = '<button class="option"><span>'+ questionObj.options[0] +'</span></button>'
        + '<button class="option"><span>'+ questionObj.options[1] +'</span></button>'
        + '<button class="option"><span>'+ questionObj.options[2] +'</span></button>'
        + '<button class="option"><span>'+ questionObj.options[3] +'</span></button>';
        que_text.innerHTML = que_tag;
        this.optionListElem.innerHTML = option_tag;
        
        this.options = this.optionListElem.querySelectorAll(".option");

        this.options.forEach((option) => {
            option.setAttribute("onclick", "Controller.handleOptionClickedEvent(this)");
        });
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
    
    highlightChoice(choice, isChoiceCorrect) {
        /*
        highlightChoice function, highlights correct/incorrect answer on quiz ui.
        
        Params:
            - userChoice: String
            - isChoiceCorrect: Boolean
        */
        
        this.options.forEach((option) => {
            if (option.textContent == choice) {
                if (isChoiceCorrect) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", UIHandler.tickIconTagHTML);
                } 
                else {
                    option.classList.add("incorrect");
                    option.insertAdjacentHTML("beforeend", UIHandler.crossIconTagHTML);
                }
            }
        });
    }
    
    disableOptions() {
        /*
        disableOptions function, is used to disable the option on quiz ui.
        */
        this.options.forEach(option => option.classList.add("disabled"));
    }
    
    updateTimeLeftText(timeLeft) {
        /*
        updateTimeLeftText function, update the time left text on quiz screen.
        
        Params:
            - timeLeft: Number,
        */
        
        if (timeLeft < 0) {
            this.timeTextElem.textContent = "Time Off";
            this.timeCountElem.textContent = "---";
        }
        else {
            this.timeCountElem.textContent = timeLeft.toString();
        }
    }
    
    resetTimeLeftText(timeLimit) {
        /*
        resetTimeLeftText function, resets the time left text on quiz screen.
        
        Params:
            - timeLeft: Number,
        */
        this.timeTextElem.textContent = "Time Left";
        this.timeCountElem.textContent = timeLimit;
    }
    
    updateTimeLine(currTime, timeLimit) {
        /*
        updateTimeLine function, update the timeline element on quiz screen.
        
        Params:
            - currTime: Number,
            - timeLimit: Number,
        */
        let widthVector = 1 - (currTime/timeLimit);
        this.timeLineElem.style.width = (widthVector*100) + "%";
    }
    
    resetTimeLine() {
        /*
        resetTimeLine function, resets the timeline element on quiz screen.
        */
        this.timeLineElem.style.width = 100 + "%";
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
