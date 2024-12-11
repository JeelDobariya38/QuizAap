/*
PerformanceVector is emun that is liable to convert performance/percentage/userscore in human readable words form
 
 - value 100 or above will be count as EXPONENTIAL
 - value 90 or above will be count as GREAT
 - value 80 or above will be count as GOOD, and soon and so forth. to zero.
*/
const PerformanceVector = Object.freeze({
    EXPONENTIAL: 100,
    EXCELLENT: 90,
    GREAT: 80,
    GOOD: 65,
    BAD: 40,
    POOR: 20,
    ZERO: 0,
});

class SessionContext {
    /*
        SessionContext class is responsible for store session context. 
        
        - changeQuestion(): for changeing question
        - checkAnswer(): for checking answer
    */
    
    constructor() {
        this.userScore = 0;
        this.questionCount = 0;
        this.totalQuestionCount = questions.length;
        this.currentQuestion = undefined;
    }
      
    changeQuestion() {
        /*
        changeQuestion function is use to change question.
        */
        this.questionCount += 1;
        this.currentQuestion = questions[this.questionCount-1];
    }
      
    checkAnswer(userAns) {
        /*
        checkAnswer function is use to check the answer for current question.
        
        Params:
            - userAns: String,
        
        Returns:
            - Boolean
        */
        return this.currentQuestion.answer == userAns;
    }
    
    calculateUserPerformance() {
        /*
        calculateUserPerformance function is use to calculate user performance for current session.
        
        Returns:
            - PerformanceVector
        */
        
        if (this.userScore > this.totalQuestionCount) {
            throw `Error: userScore (${this.userScore}) exceeded the totalQuestionCount (${this.totalQuestionCount})`;
        }
        
        let normalizedPercentage = this.userScore / this.totalQuestionCount;
        let percentage = normalizedPercentage * 100;
        
        if (percentage >= 100) return PerformanceVector.EXPONENTIAL
        else if (percentage >= PerformanceVector.EXCELLENT) return PerformanceVector.EXCELLENT
        else if (percentage >= PerformanceVector.GREAT) return PerformanceVector.GREAT
        else if (percentage >= PerformanceVector.GOOD) return PerformanceVector.GOOD
        else if (percentage >= PerformanceVector.BAD) return PerformanceVector.BAD
        else if (percentage >= PerformanceVector.POOR) return PerformanceVector.POOR
        else return PerformanceVector.ZERO;
    }
}
