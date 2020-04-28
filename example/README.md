# String Calculator Kata Example [![codecov](https://codecov.io/gh/gotmonkey/premiss/branch/master/graph/badge.svg?token=7PITAAEMMK&flag=example)](https://codecov.io/gh/gotmonkey/premiss?flag=example)

## To run
At the root of the project run:  
`npm i`  
`npm run example`

## The Kata
### 1. the simplest thing
Create a simple String calculator with a method signature:

___
`add(numbers: string): number`.
___

The method can take up to two numbers, separated by commas, and will return their sum.  
For example `""` or `"1"` or `"1,2"` as inputs.  
An empty string it will return 0.

---  

### 2. handle an unknown amount of numbers  
Allow the `add()` method to handle an unknown amount of numbers.

---

### 3. handle new lines between numbers
Allow the `add()` method to handle new lines between numbers (instead of commas).

1. the following input is ok: `"1\n2,3"` (will equal 6)
2. the following input is NOT ok: `"1,\n"` (not need to prove it - just clarifying)

---

### 4. support different delimiters

1. to change a delimiter, the beginning of the string will contain a separate line that looks like this:  
`"//[delimiter]\n[numbers…]"` for example `"//;\n1;2"` should return three where the default delimiter is `";"`.
2. the first line is optional. all existing scenarios should still be supported

---

### 5. negative numbers
Calling `add()` with a negative number will throw an exception `"negatives not allowed"` - and the negative that was passed.  
For example `add("1,4,-1")` should throw an exception with the message `"negatives not allowed: -1"`.  
If there are multiple negatives, show all of them in the exception message.

---

### 6. ignore big numbers
Numbers bigger than `1000` should be ignored, so adding `2 + 1001 = 2`

---

### 7. delimiters can be of any length with the following format:
`"//[delimiter]\n"` for example: `"//[\***]\n1\***2\***3"` should return 6

---

### 8. allow multiple delimiters like this:  
`"//[delim1][delim2]\n"` for example `"//[\*][%]\n1\*2%3"` should return 6.

---

### 9. make sure you can also handle multiple delimiters with length longer than one char

Credits to [Roy Osherove](https://osherove.com/tdd-kata-1) for the kata.