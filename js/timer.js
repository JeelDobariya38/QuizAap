class Timer {
    /*
    Timer class is responsible for creating timers. 
    
    Param: (of constructor)
      - timeLimit: Number
      - onTimeTick: Function (this function is called on every timer tick with newTime passed as argument)
      - onTimeOut: Function (this function is called when timer finish succesfully without interupts, with newTime passed as argument)
    
    Methods: (chainable)
        - start(): for starting timer.
        - interupt(): for interupting timer.
        - reset(): for reset timer.
    */
    
    static SECOND = 1000;
    
    constructor(timeLimit, onTimeTick, onTimeOut) {
        this.time = 0;
        this.timeLimit = timeLimit;
        
        this.onTimeTick = onTimeTick;
        this.onTimeOut = onTimeOut;
        
        this.updateTimeTickInterval = undefined;
    }
    
    start() {
        /*
        update the time variable at every second & call onTimeTick function, utill timer is not completed & when timer is completed, it calls onTimeOut function.
        */
        if (this.time >= this.timeLimit) {
            this.onTimeOut();
        }
        
        this.updateTimeTickInterval = setInterval(() => {
            if (this.time == this.timeLimit) {
                clearInterval(this.updateTimeTickInterval);
                this.onTimeOut(this.time);
            } else {
                this.time += 1;
                this.onTimeTick(this.time);
            }
        }, Timer.SECOND);
    }
    
    interupt() {
        if (!this.updateTimeTickInterval) {
            clearInterval(this.updateTimeTickInterval);
            this.updateTimeTickInterval = undefined;
        }
    }
    
    reset() {
        this.interupt();
        this.time = 0;
    }
}
