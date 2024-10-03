# JavaScript

### Commond JS vs ES6
- **CommonJS:** This module system originated in the Node.js environment. It was created before JavaScript had its own module system, and it's still the most common system in Node.js projects today.
- **ES6 Modules:** Introduced as part of ECMAScript 2015 (ES6), this module system is natively supported in modern browsers and is becoming the standard for JavaScript, especially for frontend development.

#### Nested Functions
The nested function is private to its containing function, and nested function can "inherit" the arguments and variables of its containing fucution.

e.g.

    function addSquares(a, b) {
        function square(x) {
            return x * x;
        }
        return square(a) + square(b);
    }
    
    console.log(addSquares(2, 3)); // 13
    console.log(addSquares(3, 4)); // 25
    console.log(addSquares(4, 5)); // 41

## JavaScript Modules

#### import() vs require()
Both used to include **modules** within your JS file, diff as follows:

| import()                         | require()|
|----------------------------------|-----------------|
| export                           | module.exports  |
| ES6                              | commonJs        |
| runs at the beginning of the file| anywhere        |
| can selectively load             | load whole piece|
| aynchronous                      | synchronous     |
