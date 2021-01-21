const calc = new Calculator;
calc.display.innerHTML = '0';
let val;
document.addEventListener('keyup', function (e) {
    if (e.keyCode === 13 && typeof val != 'undefined') {
        calc.calculate(val);
    }
    else {
        val = calc.getAndShowInput(e);
    }
})
calc.calculate(input);

function Calculator() {
    let elementVector = []; 
    let tempVal = 0;
    this.display = document.querySelector('.display');
    this.getAndShowInput(e) {
        let inputVal = getVal();
        showInput(inputVal);
        function getVal() {
            let rowI = 0; let rowJ = 0; let checkOperator = 0;  
            let checkRowJ = 0;
            if ((e.key >= 0 && e.key <= 9) || e.key === '.'
                || e.key === ',') {
                checkOperator = 0;
                if (e.key === '.') {
                    tempVal += ',';
                    return tempVal;
                }
                else {
                    tempVal += e.key;
                    return tempVal;
                }
            }
            if (e.key === '/' || e.key === '*' || e.key === '-' ||
                e.key === "+" || e.key === '^') {
                if (checkOperator === '0') {
                    elementVector[rowI][rowJ] = tempVal;
                    rowI++;
                    elementVector[rowI][rowJ] = e.key;
                    checkOperator = 1;
                }
                else {
                    elementVector[n] = e.key;
                }
            }
            if (e.key === '(') {
                if (checkRowJ === 0) {
                    rowJ++;
                    checkRowJ++;
                }
                else {
                    checkRowJ++;
                }
            }
            if (e.key === ')') {
                if (checkRowJ != 0) {
                    rowJ++;
                    checkRowJ--;
                }
            }
        }
    };
}


/* document.addEventListener('keyup', function(e) {
    if (e.key >= 0 && e.key <= 9 || e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+"
    || e.key === "." || e.key === "," || e.key === "^") {
        if (e.key === ".") {
            // input.innerHTML += ",";
            elementVector.push(',');
            console.log(elementVector);
        }
        else {
            //input.innerHTML += e.key;
            elementVector.push(e.key);
            console.log(elementVector);
        }
    }
    if (e.key === 'Backspace') {
        elementVector.pop();
        console.log('ok');
    }
    input.innerHTML = elementVector.join();
})*/