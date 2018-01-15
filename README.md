# function-override
A basic utility to override some functions

Usage

Returns a function which takes in some parameters and returns a new overriden function

The function takes in the `context` as the first parameter, `functionToReplace` as the second parameter and `options` as the third parameter.

`functionToReplace` should be a property of the context. The returned function will be the overridden function.

# options

1. `before`: The function to execute before the original function is executed
2. `after` :The function to execute after the original function is executed
