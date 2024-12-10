class SessionContext {
  constructor() {
    this.userScore = 0;
    this.questionCount = 0;
    this.totalQuestionCount = questions.length;
    this.currentQuestion = undefined;
  }
  
  changeQuestion() {
    this.questionCount += 1;
    this.currentQuestion = questions[this.questionCount-1];
  }
  
  checkAnswer(userAns) {
    return this.currentQuestion.answer == userAns;
  }
}
