// TO DO 
// don't toggle for zero 
// no decimal after dot 
// allow 0.123 .. numbers 
// handle plus/minus, after equality was pressed (should be able to toggle)
// make sure reset sign after each op 
// handle logic for pressing operators twice
// pressing numbers after equality, should reset operator to none; 

let temp = []; 
let first = []; 
let second = []; 
let operator;
let res; 
let sign = "+"; 
let isEqualPressed = false; 


let displayContainerElem = document.querySelector(".display-container"); 
let displayElem = document.querySelector(".js-display-text"); 

document.querySelector(".js-ac-button").addEventListener('click', _clear); 


document.querySelector(".js-plus-minus-button").addEventListener('click', () => {
    if (temp.length === 0) {
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
            return
        }
         
    } else {
        togglePlusMinus();
    }
});

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



document.querySelectorAll(".js-digit-button")
    .forEach((elem) => {
        elem.addEventListener("click", () => {
            
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
            if (elem.innerText === "0" && temp.length === 0) {
                return 
            }
            temp.push(elem.innerText); 
            displayElem.innerText = temp.join("");
            console.log(displayElem.scrollWidth)

            scaleTextToFit(); 
        })
    })



document.querySelectorAll(".js-operator-button")
    .forEach((elem) => {
        elem.addEventListener("click", () => {
            if (isEqualPressed) {
                isEqualPressed = false; 
            }

            if (first.length === 0) {
                first = [...temp]; 
                temp = [];  
            } else if (second.length === 0) {
                // dont' do anything, if the last pressed
                // button was also operator thus and temp is empty
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

            // console.log(first); 
            // console.log(second); 
            // console.log(temp); 
            // console.log(operator)
            
        })
    })


document.getElementById("=").addEventListener('click', (elem) => {
    isEqualPressed = true; 

    second = [...temp]; 
    res = operate(first, second, operator);
    first = [res];  
    second = []; 
    temp = []; 
    // reset sign 
    sign = "+"; 

    displayElem.innerText = res; 
    console.log(displayElem.scrollWidth)

    scaleTextToFit(); 
})


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
        num1 = temp.slice(0, 4); 
        num2 = temp.slice(index-1, temp.length); 
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

    // while (displayElem.scrollWidth < (displayContainerElem.clientWidth-20)) {
    //     currFontSize++; 
    //     displayElem.style.fontSize = currFontSize + 'px'; 
    // }
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





