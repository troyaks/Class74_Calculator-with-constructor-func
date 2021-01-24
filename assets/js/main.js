/* ---------------------------------------
-------------- Main Code ----------------- 
--------------------------------------- */

// Initialize parameters.
let matrix = [];
// Initialize the constructor function and assign it.
const calc = new Calculator;
// Bring the `0` value to the calculator display.
calc.display.innerHTML = '0';
// Listen to entry events.
document.addEventListener('keyup', function (event) {
    if ((event.key >= 0 && event.key <= 9) || event.key === '.'
        || event.key === ',' || event.key === '/' || event.key === '*'
        || event.key === '-' || event.key === '+' || event.key === '^'
        || event.key === '(' || event.key === ')') {
        matrix = calc.get(event);
        calc.show(matrix);
    }
    if (event.key === 'Enter' || event.key === '=') {
        let result = calc.calculate(matrix);
        calc.show(result);
    }
})

/* ---------------------------------------
-------------- Functions ----------------- 
--------------------------------------- */

function Calculator() {
    let elementArray = []; let rowI = 0; let rowJ = 0; let tempVal = 0;
    let operatorIsLast = 0; let checkParenth = 0; let numAftrParenth = -1;
    let checkNumAftNum = 1; let lastEntryIsFnc = 0; let parenthIsLast = 0;

    this.display = document.querySelector('.display');

    this.get = (e) => {
        if (!elementArray[rowI]) {
            elementArray[rowI] = [];
        }
        if ((e.key >= 0 && e.key <= 9) || (e.key === '.'
            || e.key === ',')) {
            if (checkParenth != 0 && numAftrParenth === 0
                && checkNumAftNum === 0) {
                /* check if last entry was a parenthesis AND 
                no number has been entered after it. */
                add(e.key);
                operatorIsLast = 0;
                numAftrParenth = 1;
                checkNumAftNum = 1;
                lastEntryIsFnc = 1;
            }
            if ((operatorIsLast === 1 &&
                !(e.key === '.' || e.key === ','))) {
                /* Check if the last entry is not an operator AND 
                check if the current entry is not '.' NOR ',' */
                newColumn();
                add(e.key);
                operatorIsLast = 0;
                numAftrParenth = 1;
                checkNumAftNum = 1;
                lastEntryIsFnc = 1;
            }
            if (checkNumAftNum === 1 && lastEntryIsFnc === 0) {
                /* Check if the last entry is a number AND
                check if the last entry wasn't created by a function */
                if (numAftrParenth === -1) {
                    numAftrParenth = 1;
                    console.log(numAftrParenth);
                }
                if (e.key === '.') {
                    // In case the key entered is '.' change to ','
                    add(`,`);
                } else {
                    add(e.key);
                }
            }
        }
        if ((e.key === '/' || e.key === '*' || e.key === '-' ||
            e.key === '+' || e.key === '^') &&
            (numAftrParenth === 1)) {
            if (operatorIsLast === 0) {
                /* In case last entry is not an operator */
                newColumn();
                add(e.key, 'overwrite');
                operatorIsLast = 1;
            }
            else {
                add(e.key, 'overwrite');
            }
        }
        if (e.key === '(') {
            numAftrParenth = 0;
            checkNumAftNum = 0;
            if (operatorIsLast === 0 && parenthIsLast === 0) {
                /* In case the previous entry is not an operator AND
                there is already a parenthesis added */
                newColumn();
                add('*');
                newColumn();
                add(e.key);
                newColumn();
                parenthIsLast = 1;
                checkParenth++;
            }
            else {
                if (parenthIsLast === 1) {
                    /* In case the last entry is a parenthesis */
                    add(e.key);
                    newColumn();
                    checkParenth++;
                }
                else {
                    /* In case there has been added a parenthesis
                    but it is not the last entry */
                    newColumn();
                    add(e.key);
                    newColumn();
                    checkParenth++;
                }
            }
        }
        if (e.key === ')' && operatorIsLast === 0 && checkParenth != 0) {
            /* Check if ')' is pressed (AND) if the previous entry
            is not an operator (AND) if an '(' has been used */
            newColumn();
            add(e.key);
            checkParenth--;
        }
        function newColumn() {
            /* Function to create a newColumn on the matrix */
            rowI++;
            rowJ = 0;
            if (!elementArray[rowI]) {
                elementArray[rowI] = [];
            }
        }
        function add(val, status) {
            /* Function to add the captured value to the matrix */
            if (status === 'overwrite') {
                elementArray[rowI][rowJ] = val;
            }
            if (typeof status === 'undefined') {
                elementArray[rowI][rowJ] = val;
                rowJ++;
            }
        }
        return elementArray.toString().replace(/,*/gm, ''); 
        /* Above statement is to turn the matrix of input values into 
        a string, replace all `,` by '' (nothingness) 
        which means deleting it and then return it. */
    }

    this.show = (showVal) => {
        calc.display.innerHTML = `${showVal}`;
    }

    this.calculate = (tmpMat) => {
        tmpMat = eval(tmpMat);
        return tmpMat;
    }
}