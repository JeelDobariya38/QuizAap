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
        this.infoBox = document.querySelector(".info_box");
        this.quizBox = document.querySelector(".quiz_box");
        this.resultBox = document.querySelector(".result_box");
    }
    
    toggleScreen(screenType) {
        this.infoBox.classList.remove("activeInfo");
        this.quizBox.classList.remove("activeQuiz");
        this.resultBox.classList.remove("activeResult");
        
        if (screenType == ScreenTypes.INFO) {
            info_box.classList.add("activeInfo");
        } 
        else if (screenType == ScreenTypes.QUIZ) {
            quiz_box.classList.add("activeQuiz");
        }
        else if (screenType == ScreenTypes.RESULT) {
            result_box.classList.add("activeResult");
        }
        else {
            throw new InvalidScreenTypeError();
        }
    }
}
