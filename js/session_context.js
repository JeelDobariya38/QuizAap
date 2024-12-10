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
}
