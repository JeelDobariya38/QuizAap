class InvalidEnumValueError extends Error {
    /*
    InvalidEnumValueError represents a runtime error,
    This error is raise when a invalid value is passed to function 
    where, the parameter is expected to be of some sort of enum type.
    
    Param: (of constructor)
      - valuePassed: AnyTypeOfValue (value passed to func, which is invalid)
      - enumObjName: String (name of enum obj, which included all valid values)
    */
    
    constructor (valuePassed, enumObjName) {
        super();
        this.message = `Error: Value (${valuePassed}) passed is not a valid value in "${enumObjName}" Enum`;
    }
}

/*
ScreenType is emun that is liable,
to represent all the screens/views types/layouts in entire website.
*/
const ScreenType = Object.freeze({
    BLANK: 0,
    INFO: 1,
    QUIZ: 2,
    RESULT: 3
});

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
