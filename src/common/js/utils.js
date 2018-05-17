var utils = {};
utils.isCorrectVal = function (variable) {
    var result = true;
    if (typeof variable === "string") {
        if (variable === '' || variable === 'undefined' || variable === 'null' || variable === 'NaN' || variable === 'Infinity') {
            result = false;
        }
    } else if (typeof variable === "number") {
        if (isNaN(variable) || !isFinite(variable)) {
            result = false;
        }
    } else if (variable === null) {
        result = false;
    } else if (typeof variable === 'undefined') {
        result = false;
    } else if (this.isObject(variable)) {
        if (this.isEmptyObject(variable)) {
            result = false;
        }
    } else if (this.isArray(variable)) {
        if (variable.length === 0) {
            result = false;
        }
    }
    return result;
}
export default utils