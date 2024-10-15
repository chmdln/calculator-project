let temp = []; 
let first = []; 
let second = []; 
let operator;
let res; 
let sign = "+"; 
let isEqualPressed = false; 


let displayContainerElem = document.querySelector(".display-container"); 
let displayElem = document.querySelector(".js-display-text"); 

function useSignOperator() {
    if (temp.length === 0) {
        // can toggle "+/-" if "=" was pressed 
        if (isEqualPressed) {
            let strRes = first[0].toString(); 
            if (strRes[0] != "-") {
                strRes = "-" + strRes; 
                first = [Number(strRes)]; 
                displayElem.innerText = "-" + displayElem.innerText;
            } else {
                first = [Number(strRes.slice(1, strRes.length))];
                displayElem.innerText = displayElem.innerText.slice(1,displayElem.innerText.length);
            }
        } else {
        // else can't toggle
            return
        }
         
    } else {
        togglePlusMinus();
    }
}


function togglePlusMinus() {
    if (sign === "+") {
        sign = "-"; 
        displayElem.innerText = sign + displayElem.innerText; 
        temp.unshift(sign); 
    } else if (sign === "-") {
        sign = "+"
        displayElem.innerText = displayElem.innerText.slice(1,displayElem.innerText.length); 
        temp.shift(); 
    }
}


function usePercentOperator() {
    if (temp.length === 0) {
        if (isEqualPressed) {
            first = convertToPercent(first); 
        } else {
            temp.push("0");
        }
         
    } else {
        temp = convertToPercent(temp);  
    }
}


function convertToPercent(array) {
    let val = Number(array.join("")); 
    val = checkAndTruncate(val/100); 
    valToString = val.toString();  
    array = valToString.split(""); 
    displayElem.innerText = valToString;
    scaleTextToFit(); 
    
    return array
}



function useDigitKeyboard(event) {
    if (isEqualPressed) {
        isEqualPressed = false; 

        temp = []; 
        first = []; 
        second = []; 
        operator = "";
        res = "";  
        sign = "+";  
    }

    // handle leading zero
    if (typeof Number(event.key) === 'number') {
        if (temp[0] === "0" && !temp.includes(".")) {
            temp.shift(); 
        }
    }

    // handle '.' operator
    if (event.key === ".") {
        if (temp.length === 0) {
            temp.push("0"); 
        }

        if (temp.includes(".")) {
            return 
        }
    }

    temp.push(event.key); 
    displayElem.innerText = temp.join("");
    scaleTextToFit();
}



function useDigit(elem) {
    // if we press a number after equality, 
    // reset all variables 
    if (isEqualPressed) {
        isEqualPressed = false; 

        temp = []; 
        first = []; 
        second = []; 
        operator = "";
        res = "";  
        sign = "+";  
    }

    // handle leading zero
    if (typeof Number(elem.innerText) === 'number') {
        if (temp[0] === "0" && !temp.includes(".")) {
            temp.shift(); 
        }
    }

    // handle '.' operator
    if (elem.innerText === ".") {
        if (temp.length === 0) {
            temp.push("0"); 
        }

        if (temp.includes(".")) {
            return 
        }
    }

    temp.push(elem.innerText); 
    displayElem.innerText = temp.join("");
    scaleTextToFit();
}


function useOperatorKeyboard(event) {
    if (isEqualPressed) {
        isEqualPressed = false; 
    }

    if (first.length === 0) {
        first = [...temp]; 
        temp = [];  
    } else if (second.length === 0) {
        if (temp.length === 0) {
            operator = event.key
            return 
        }
        second = [...temp];  
        res = operate(first, second, operator);
        first = [res];  
        second = []; 
        temp = [];  

        displayElem.innerText = res; 
        scaleTextToFit(); 
    }
    
    // assign the operator 
    operator = event.key;
    // reset sign
    sign = "+"; 
}


function useOperator(elem) {
    if (isEqualPressed) {
        isEqualPressed = false; 
    }

    if (first.length === 0) {
        first = [...temp]; 
        temp = [];  
    } else if (second.length === 0) {
        // dont' do anything, if the last pressed
        // button was also operator, thus temp is empty
        if (temp.length === 0) {
            operator = elem.id 
            return 
        }
        second = [...temp];  
        res = operate(first, second, operator);
        first = [res];  
        second = []; 
        temp = [];  

        displayElem.innerText = res; 
        scaleTextToFit(); 
    }
    
    // assign the operator 
    operator = elem.id;
    // reset sign
    sign = "+"; 
}



function useEqualityOperator() {
    if (first.length !== 0 && temp.length !== 0) {
        isEqualPressed = true; 
        second = [...temp]; 
        res = operate(first, second, operator);
        first = [res];  
        second = []; 
        temp = []; 
        // reset sign 
        sign = "+"; 
    
        displayElem.innerText = res; 
        scaleTextToFit(); 
    }
}


function operate(arr1, arr2, op) {
    let output;
    let val1 = Number(arr1.join("")); 
    let val2 = Number(arr2.join(""));  
    
    if (op === "+") {
        output = val1 + val2
    } else if (op === "-") {
        output = val1 - val2 
    } else if (op === "/") {
        output = val1 / val2 
    } else if (op === "*") {
        output = val1 * val2
    } 

    return checkAndTruncate(output)
}


function checkAndTruncate(res) {
    let temp = res.toString(); 
    let num1; 
    let num2; 

    if (temp.includes("e")) {
        index = temp.indexOf("e"); 
        let sub = temp.slice(0,index).length 
        num1 = temp.slice(0, Math.min(4,sub)); 
        num2 = temp.slice(index, temp.length); 
        return Number(num1+num2) 
    }
    return res 
}


function scaleTextToFit() {
    let currFontSize = 50; 
    displayElem.style.fontSize = currFontSize + 'px';

    while (displayElem.scrollWidth > (displayContainerElem.clientWidth-20)) {
        currFontSize--; 
        displayElem.style.fontSize = currFontSize + 'px'; 
    }
}


function _clear() {
    temp = []; 
    first = []; 
    second = []; 
    operator = "";
    res = "";  
    isEqualPressed = false; 

    displayElem.innerText = 0; 
    displayElem.style.fontSize = '50px'; 

}



document.querySelectorAll(".js-operator-button")
    .forEach((elem) => {
        elem.addEventListener("click", () => {
            useOperator(elem); 
        })
    })

window.addEventListener('keydown', (event) => {
    let events = "+-/*"; 
    if (events.includes(event.key)) {
        useOperatorKeyboard(event); 
    }
})

document.querySelector(".js-ac-button")
    .addEventListener('click', _clear); 

window.addEventListener('keydown', (event) => {
    if (event.key === "c" | event.key === "C") {
        _clear(); 
    }
})

document.querySelector(".js-plus-minus-button")
    .addEventListener('click', useSignOperator);

window.addEventListener('keydown', (event) => {
    if (event.key === "_") {
        useSignOperator(); 
    }
})

document.querySelector('.js-percent-button')
    .addEventListener('click', usePercentOperator)

window.addEventListener('keydown', (event) => {
    if (event.key === "%") {
        usePercentOperator(); 
    }
})


document.querySelectorAll(".js-digit-button")
    .forEach((elem) => {
        elem.addEventListener("click", () => {
            useDigit(elem)
        })
    })

window.addEventListener('keydown', (event) => {
    let digits = "0123456789."; 
    if (digits.includes(event.key)) {
        useDigitKeyboard(event); 
    }
})


document.getElementById("=").addEventListener('click', useEqualityOperator); 

window.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        useEqualityOperator(); 
    }
})




