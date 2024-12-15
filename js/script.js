//if user clicked on option
function onOptionSelected(selectedOption) {
    controller.timer.interupt();
    controller.answerQuestion(selectedOption.textContent);
}

// ----- Contoller Part -----
const controller = new Controller();
controller.startApp();
