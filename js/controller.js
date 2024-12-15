class Controller {
    /*
    Controller class is responsible for maintaing & controlling the flow of application.
    all event listiner are defined here.
    */
    
    constructor(timer) {
        this.currSession = undefined;
        this.timer = timer;
        this.uihandler = new UIHandler();
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
    
    submitQuiz() {
        /*
        display a result screen with user stats. also, reset timer for next time.
        */
        this.timer.reset();
        
        let performanceVector = this.currSession.calculateUserPerformance();
        this.uihandler.toggleScreen(ScreenType.RESULT);
        this.uihandler.updateScoreText(performanceVector, this.currSession.userScore, this.currSession.totalQuestionCount);
    }
}
