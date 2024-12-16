class Controller {
    /*
    Controller class is responsible for maintaing & controlling the flow of application.
    all event listiner are defined here.
    
    Static Methods:
        - init(): for initizalizing controller.
        - run(): for running the controller.
    */
    
    static currSession = undefined;
    static uihandler = undefined;
    static timer = undefined;
    
    static init(initDependency) {
        /*
        for inilizing controller and setup neccessary event listiner.
        */
        
        Controller.uihandler = new UIHandler();
        Controller.timer = new Timer(15, Controller.onTimerTickUpdate, Controller.onTimerFinish);
        Controller.setupEventListener();
    }
    
    static run() {
        /*
        for running the controller.
        */
        
        Controller.startApp();
    }
    
    static setupEventListener() {
        /*
        for setup up onclick event listiner.
        */
        
        const startBtn = document.querySelector(".start_btn button");
        const exitBtn = document.querySelector(".info_box").querySelector(".buttons .quit");
        const continueBtn = document.querySelector(".info_box").querySelector(".buttons .restart");
        const restartQuizBtn = document.querySelector(".result_box").querySelector(".buttons .restart");
        const quitQuizBtn = document.querySelector(".result_box").querySelector(".buttons .quit");
        const nextQuestionBtn = document.querySelector("footer .next_btn");


        startBtn.onclick = () => Controller.displayQuizInfo();
        exitBtn.onclick = () => Controller.goToHomepage();
        continueBtn.onclick = () => Controller.startQuiz();
        restartQuizBtn.onclick = () => Controller.startQuiz();
        quitQuizBtn.onclick = () => Controller.reloadApp();
        nextQuestionBtn.onclick = () => {
            if(Controller.currSession.hasNextQuestion()){
                Controller.nextQuestion();
            } 
            else{
                Controller.submitQuiz();
            }
        }
    }
    
    static startApp() {
        /*
        display the homepage.
        */
        
        Controller.goToHomepage();
    }
    
    static reloadApp() {
        /*
        reload the website.
        */
        
        window.location.reload();
    }
    
    static goToHomepage() {
        /*
        display the homepage.
        */
        
        Controller.uihandler.toggleScreen(ScreenType.HOME);
    }
    
    static displayQuizInfo() {
        /*
        display the info about quiz.
        */
        
        Controller.uihandler.toggleScreen(ScreenType.INFO);
    }
    
    static startQuiz() {
        /*
        start a new quiz session, display first question on screen, with timer started.
        */
        
        Controller.currSession = new SessionContext();
        Controller.uihandler.toggleScreen(ScreenType.QUIZ);
        
        this.nextQuestion();
    }
    
    static nextQuestion() {
        /*
        display a next question on screen, with timer started again.
        assume, user is on quiz screen as quiz is ongoing...
        */
        
        Controller.currSession.changeQuestion();
        Controller.uihandler.resetTimeLine();
        Controller.uihandler.resetTimeLeftText(Controller.timer.timeLimit);
        Controller.uihandler.updateQuestion(Controller.currSession.questionCount, Controller.currSession.currentQuestion);
        Controller.uihandler.updateQuestionCounter(Controller.currSession.questionCount, Controller.currSession.totalQuestionCount);
        Controller.uihandler.updateNextBtnVisiblity(false);
        
        Controller.timer.reset();
        Controller.timer.start();
    }
    
    static answerQuestion(userAns) {
        /*
        answers the question & update the ui in response to user answer.
        */
        
        let isOptionCorrect = Controller.currSession.checkAnswer(userAns);
        
        if(isOptionCorrect) {
            Controller.currSession.userScore += 1;
        }
        else {
            Controller.uihandler.highlightChoice(Controller.currSession.currentQuestion.answer, true);
        }
        
        Controller.uihandler.highlightChoice(userAns, isOptionCorrect);
        Controller.uihandler.disableOptions();
        Controller.uihandler.updateNextBtnVisiblity(true);
    }
    
    static submitQuiz() {
        /*
        display a result screen with user stats. also, reset timer for next time.
        */
        Controller.timer.reset();
        
        let performanceVector = Controller.currSession.calculateUserPerformance();
        Controller.uihandler.toggleScreen(ScreenType.RESULT);
        Controller.uihandler.updateScoreText(performanceVector, Controller.currSession.userScore, Controller.currSession.totalQuestionCount);
    }
    
    static onTimerTickUpdate(newTime, timeLimit) {
        /*
        update the ui when timer ticks.
        */
        Controller.uihandler.updateTimeLeftText(timeLimit - newTime);
        Controller.uihandler.updateTimeLine(newTime, timeLimit);
    }
    
    static onTimerFinish(newTime) {
        /*
        update the ui when timer finishs.
        */
        Controller.uihandler.highlightChoice(Controller.currSession.currentQuestion.answer, true);
        Controller.uihandler.disableOptions();
        Controller.uihandler.updateNextBtnVisiblity(true);
    }
    
    static handleOptionClickEvent(clickedOption) {
        /*
        handle the option click event & update the ui accodringly.
        */
        Controller.timer.interupt();
        Controller.answerQuestion(clickedOption.textContent);
    }
}
