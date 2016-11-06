//class

function Person(firstName, lastName) {
    this.fName = firstName;
    this.lName = lastName;

    this.sayHello = function() {
        return this.fName + " " + this.lName;
    };
}

var person = new Person("Stefan", "Kowalski");

//Prototyp usages

function Person1(firstName, lastName) {
    this.fName = firstName;
    this.lName = lastName;
}

//more performance usages with method fro class
Person1.prototype.sayHello = function() {
    return this.fName + " " + this.lName;
};


var person1 = new Person1("Stefan", "Kowalski");

person1.sayHello = function() {
    return this.fName.toUpperCase() + " " + this.lName;
};


//multiple inheritance is supported in JavaScript

/*

Shape
    Rectangle
        Square
    Triangle
*/

function Shape(sideLengths) {
    this._name = "";
    this._sideLengths = sideLengths;
}

Shape.prototype.getArea = function() {
    return this._sideLengths[0] * this._sideLengths[1];
};

Shape.prototype.getPerimeter = function() {
    return this._sideLengths.reduce(function(prevValue, val) {
        return prevValue + val;
    });
};

Shape.prototype.toString = function() {
    return "[object: " + this._name + "]";
};

function Rectangle(sideLengths) {
    this._name = "Rectangle";
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

function Square(sideLengths) {
    this._name = "Square";
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;


function Triangle(sideLengths) {
    Shape.call(this, [sideLengths, sideLengths, sideLengths]);
    this._name = "Triangle";
}

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.getArea = function() {
    var a = this._sideLengths[0];

    return +((a * a * Math.sqrt(3)) / 4).toFixed(2);
};

var shape1 = new Shape([20, 10, 20, 10]);
