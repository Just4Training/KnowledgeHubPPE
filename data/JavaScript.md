# JavaScript

## Basic
### Array
- shift

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

### Event
Events are things that happen in the system you are programming — the system produces (or "fires") a signal of some kind when an event occurs, and provides a mechanism by which an action can be automatically taken (that is, some code running) when the event occurs. Events are fired inside the browser window, and tend to be attached to a specific item that resides in it.

- The user selects, clicks, or hovers the cursor over a certain element.
- The user chooses a key on the keyboard.
- The user resizes or closes the browser window.
- A web page finishes loading.
- A form is submitted.
- A video is played, paused, or ends.
- An error occurs.

To react to an event, you attach an event handler to it