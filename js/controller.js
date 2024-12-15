class Controller {
    /*
    Controller class is responsible for maintaing & controlling the flow of application.
    all event listiner are defined here.
    
    Methods:
        - startApp(): for satring the app.
        - reloadApp(): for reloading the app.
        - goToHomepage(): for going to homepage.
        - displayQuizInfo(): for display quiz info.
        - startQuiz(): for starting a quiz app.
        - nextQuestion(): for loading a next question.
        - answerQuestion(): for answering question.
        - submitQuiz(): for submiting quiz.
    */
    
    constructor() {
        this.currSession = undefined;
        this.uihandler = new UIHandler();
        this.timer = new Timer(15, this.onTimerTickUpdate, this.onTimerFinish);
    }
    
    startApp() {
        /*
        display the homepage.
        */
        
        this.goToHomepage();
    }
    
    reloadApp() {
        /*
        reload the website.
        */
        
        window.location.reload();
    }
    
    goToHomepage() {
        /*
        display the homepage.
        */
        
        this.uihandler.toggleScreen(ScreenType.HOME);
    }
    
    displayQuizInfo() {
        /*
        display the info about quiz.
        */
        
        this.uihandler.toggleScreen(ScreenType.INFO);
    }
    
    startQuiz() {
        /*
        start a new quiz session, display first question on screen, with timer started.
        */
        
        this.currSession = new SessionContext();
        this.uihandler.toggleScreen(ScreenType.QUIZ);
        
        this.nextQuestion();
    }
    
    nextQuestion() {
        /*
        display a next question on screen, with timer started again.
        assume, user is on quiz screen as quiz is ongoing...
        */
        
        this.currSession.changeQuestion();
        this.uihandler.resetTimeLine();
        this.uihandler.resetTimeLeftText(this.timer.timeLimit);
        this.uihandler.updateQuestion(this.currSession.questionCount, this.currSession.currentQuestion);
        this.uihandler.updateQuestionCounter(this.currSession.questionCount, this.currSession.totalQuestionCount);
        this.uihandler.updateNextBtnVisiblity(false);
        
        this.timer.reset();
        this.timer.start();
    }
    
    answerQuestion(userAns) {
        /*
        answers the question & update the ui in response to user answer.
        */
        
        let isOptionCorrect = this.currSession.checkAnswer(userAns);
        
        if(isOptionCorrect) {
            this.currSession.userScore += 1;
        }
        else {
            this.uihandler.highlightChoice(this.currSession.currentQuestion.answer, true);
        }
        
        this.uihandler.highlightChoice(userAns, isOptionCorrect);
        this.uihandler.disableOptions();
        this.uihandler.updateNextBtnVisiblity(true);
    }
    
    submitQuiz() {
        /*
        display a result screen with user stats. also, reset timer for next time.
        */
        this.timer.reset();
        
        let performanceVector = this.currSession.calculateUserPerformance();
        this.uihandler.toggleScreen(ScreenType.RESULT);
        this.uihandler.updateScoreText(performanceVector, this.currSession.userScore, this.currSession.totalQuestionCount);
    }
    
    onTimerTickUpdate(newTime, timeLimit) {
        /*
        update the ui when timer ticks.
        */
        this.uihandler.updateTimeLeftText(timeLimit - newTime);
        this.uihandler.updateTimeLine(newTime, timeLimit);
    }
    
    onTimerFinish(newTime) {
        /*
        update the ui when timer finishs.
        */
        this.uihandler.highlightChoice(this.currSession.currentQuestion.answer, true);
        this.uihandler.disableOptions();
        this.uihandler.updateNextBtnVisiblity(true);
    }
}
