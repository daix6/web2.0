### DOM Scripting
#### Noted by Dai Xuan
---

- Chapter1

    - Concepts:
        - DOM: document object model
        - BOM: browser object model
        - JavaScript == ECMAScript, JScript(M$)
        - DHTML: Dynamic HTML, a shorthand term for describing the combination of HTML, CSS, and JavaScript.
    - 1999.10, W3C putting together a standardized DOM. (**DOM Level 1**)
    - DOM is a kind of API.
    - Webkit: Safari Chrome Firefox
      Gecko: Firefox
      Trident: IE

- Chapter2

    - Better way to place JavaScript:
        ``` html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset-"utf-8">
            <title>test</title>
        </head>
        <body>
            ...
            <script src="test.js"></script>
            <!-- type="text/javascript" is unnecessary -->
        </body>
        </html>
        ```
    - JavaScript is a **interpreted language**, which interpreted by the web browser.
    - Semicolon(;) is not necessary but advised.
    - Comment:
        ``` JavaScript
        // comment1 -line
        /* comment2 - block*/
        ```
    - JavaScript is a **weakly typed language**.
    - Data Type

        - String, '' or "". Better to be consistent.
        - Number, interger or float, positive or negative.
        - Boolean, true or false.
        - Array, very free.
            ``` JavaScript
            var a = Arrary(args);              // arg is optional
            var b = [[1, 2, 3], "what", true]; // free, numeric array
            var c = Array();                   // associative array
            c["name"] = "H";
            c["year"] = 1999;
            ```
        - Object, a group of multiple values under the same name. Each one of the value is a property of the object.
            ```JavaScript
            var a = Object();
            a.name = "H";
            a.year = 1999;
            var b = { name: "H", year: 1999};
            var c = {};
            c.pro = a;  // c.pro.name == "H"
            ```

    - Operations

        - Arithmetic Operators,  + - / * = ++ -- +=
        - Comparision Operators, > >= < <= ==(value) ===(value and type)
        - Logical Operators,     && || !

    - Statements

        - Conditional Statements, if...else if...else
        - Looping Statements, while / do...while / for

    - Function, a group of statements that can be invoked from anyware in your code.

        - There are many built-in funnction, like `alert()`.
        - Function can be used as a data type.

    - Variable Scope

        - A global variable can be referenced from anywhere in the script, even within functions. It has a global scope.
        - A local variable exists only within the function in which it is declared. It has a local scope.
        - Use `var` to declare a local variable.

    - Objects, a self-contained collection of data, which comes in two forms: properties and methods.

        - A property is a variable belonging to an object.
        - A method is a function that the object can invoke.
        - Object.property
        - Object.method()
        - An **instance** is an individual example of a generic object.
            `var you = new ObjectName;`
        - Native Objects
            - Array
                - property: `length`
                - method:   `sort()`
            - Date, can be used to store and retrieve information about a specific date and time.
                - method: `getDay()`, `getHours()`, `getMonth()`
            - Math
                - method: `round()`

        - Host Objects, objects that are supplied by the web browser. Like Form, Image, and Element...

