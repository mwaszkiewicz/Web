exports.maybeFirst = function(array) {
    if (array && array.length) {
        return array[0];
    }
};

exports.validateName = function(value) {
    if (value !== null) {
        if (value == 'Mati') {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
