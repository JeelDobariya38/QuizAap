let onOptionSelected = undefined;

// ----- Contoller Part -----
Controller.init(() => {
    onOptionSelected = (selectedOption) => {
        Controller.timer.interupt();
        Controller.answerQuestion(selectedOption.textContent);
    }
});
Controller.run();
