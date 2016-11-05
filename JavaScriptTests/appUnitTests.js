var assert = require('assert');
var app = require('./app.js');

describe('app', function() {
    it('returns the first element of an array', function() {
        var result = app.maybeFirst([1, 2, 3]);

        assert.equal(result, 1, 'maybeFirst([1, 2, 3]) is 1');
    });

    it('returns false for invalid name', function() {
        var result = app.validateName('test');

        assert.equal(result, false, 'result is false');
    });

    it('returns true for correct name', function() {
        var result = app.validateName('Mati');

        assert.equal(result, true, 'result is true');
    });
});
