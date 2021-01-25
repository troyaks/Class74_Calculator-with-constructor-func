/* ---------------------------------------
-------------- Main Code -----------------
--------------------------------------- */

// Initialize the constructor function and assign it.
const calc = new Calculator;
// Initialize display
calc.setDisplay();
// Listen to entry events.
document.addEventListener('keyup', function (event) {
    if ((event.key >= 0 && event.key <= 9) || event.key === '.'
        || event.key === ',' || event.key === '/' || event.key === '*' || event.key === '-'
        || event.key === '+' || event.key === '^' || event.key === '(' || event.key === ')') {
        calc.fillArray(event);
        let array = calc.getArray();
        calc.setDisplay(array);
    }
    if (event.key === 'Enter' || event.key === '=') {
        let result = calc.calculate();
        let array = calc.getArray();
        calc.save(array);
        calc.setDisplay(result);
        calc.refresh(result);
    }
    if (event.key === 'Escape') {
        calc.setDisplay();
        calc.refresh();
    }
})

/* ---------------------------------------
-------------- Functions -----------------
--------------------------------------- */

function Calculator() {
    let [rowI, rowJ, parenthIsLast, operatorIsLast, 
        checkParenth, checkNumAftrParenth, checkNumAftNum, lastEntryIsFnc] = clear(true);
    let elementArray = []; let tempArray = [];
    this.display = document.querySelector('.display');

    this.save = (saveVal) => {
        tempArray = saveVal;
    }

    this.setDisplay = (setDisplayVal) => {
        if (typeof setDisplayVal === 'undefined') {
            calc.display.innerHTML = `0`;
        }
        else {
            calc.display.innerHTML = `${fit(setDisplayVal)}`;
        }
    }

    this.calculate = (calcVal) => {
        if (typeof calcVal === 'undefined') {
            /* calculate internal array */
            return eval(fit(elementArray));
        } else {
            /* calculate using external input */
            return eval(fit(calcVal));
        }
    }

    this.refresh = (refreshVal) => {
        [rowI, rowJ, parenthIsLast, operatorIsLast, 
            checkParenth, checkNumAftrParenth, checkNumAftNum, lastEntryIsFnc] = clear(false);
        elementArray.length = 0;
        if (typeof refreshVal === 'undefined') {
            elementArray[rowI] = [];
            rowJ++;
        } else {
            elementArray[rowI] = refreshVal;
            rowJ++;
        }
    }

    this.getArray = () => {
        return elementArray;
    }

    this.fillArray = (e) => {
        if (typeof e === 'undefined') {
            return elementArray;
        }
        if (!elementArray[rowI]) {
            elementArray[rowI] = [];
        }
        if ((e.key >= 0 && e.key <= 9) || (e.key === '.' || e.key === ',')) {
            console.log(`Listened to number ${e.key} key pressed`);
            checkID = 0;
            if (checkParenth != 0 && checkNumAftrParenth === 0 && checkNumAftNum === 0 && checkID === 0) {
                /* Check if a parenthesis has been added AND there is no number entry
                after the parenthesis AND there is no number after a number */
                add(e.key);
                operatorIsLast = 0;
                checkNumAftrParenth = 1;
                checkNumAftNum = 1;
                lastEntryIsFnc = 1;
                checkID = 1;
                console.log(`A parenthesis has been added AND there is no number entry after the parenthesis AND there is no number after a number`);
            }
            if ((operatorIsLast === 1 && !(e.key === '.' || e.key === ',') && checkID === 0)) {
                /* Check if the last entry is not an operator AND
                check if the current entry is not '.' NOR ',' */
                newColumn();
                add(e.key);
                operatorIsLast = 0;
                checkNumAftrParenth = 1;
                checkNumAftNum = 1;
                lastEntryIsFnc = 0;
                checkID = 1;
                console.log(`Last entry is an operator AND the current entry is not '.' NOR ','`);
            }
            if (checkNumAftNum === 1 && lastEntryIsFnc === 0 && checkID === 0) {
                /* Check if the last entry is a number AND
                check if the last entry wasn't created by a function */
                console.log(`Last entry is a number but it was created by a fnc`);
                checkID = 1;
                if (checkNumAftrParenth === -1) {
                    checkNumAftrParenth = 1;
                    console.log(checkNumAftrParenth);
                }
                if (e.key === '.') {
                    // In case the key entered is '.' change to ','
                    add(`,`);
                } else {
                    add(e.key);
                }
            }
        }
        if ((e.key === '/' || e.key === '*' || e.key === '-' || e.key === '+' || e.key === '^') &&
            (checkNumAftrParenth === 1)) {
            console.log(`Listened to operator ${e.key} key pressed`);
            if (operatorIsLast === 0) {
                /* In case last entry is not an operator */
                console.log(`Last entry is not an operator`);
                newColumn();
                add(e.key, 'overwrite');
                operatorIsLast = 1;
            }
            else {
                console.log(`Last entry is an operator. Overwrite is done.`);
                add(e.key, 'overwrite');
            }
        }
        if (e.key === '(') {
            console.log(`Listened to operator ${e.key} key pressed`);
            checkNumAftrParenth = 0;
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
            console.log(`Listened to operator ')' key pressed AND the previous entry
            is not an operator AND an '(' has been already added`)
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
    }
    function fit(fitVal) {
        /* This function is to turn the array into a string and delete all commas */
        return fitVal.toString().replace(/,*/gm, '');
    }

    function clear(clearBool) {
        if (clearBool) {
            return [0,0,0,0,0,-1,1,0];
        } else {
            return [0,0,0,0,1,1,1,0];
        }
    }
}