// TO DO 
// Double check +/- toggle with percentages



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
        // can toggle "+/-" if "=" as pressed 
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
});


function togglePlusMinus() {
    console.log(sign)
    console.log(displayElem.innerText)
    if (sign === "+") {
        sign = "-"; 
        displayElem.innerText = sign + displayElem.innerText; 
        temp.unshift(sign); 
    } else if (sign === "-") {
        sign = "+"
        displayElem.innerText = displayElem.innerText.slice(1,displayElem.innerText.length); 
        temp.shift(); 
    }
    console.log(sign)
    console.log(displayElem.innerText)
}


document.querySelector('.js-percent-button').addEventListener('click', () => {
    if (temp.length === 0) {
        if (isEqualPressed) {
            // work with 'first'
            first = convertToPercent(first); 
        } else {
            temp.push("0");
        }
         
    } else {
        temp = convertToPercent(temp);  
    }

    console.log(temp)
})

function convertToPercent(array) {
    let val = Number(array.join("")); 
    val = val/100; 
    valToString = val.toString();  
    array = valToString.split(""); 
    displayElem.innerText = valToString;
    scaleTextToFit(); 
    return array
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
            if (typeof Number(elem.innerText === 'number')) {
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
            console.log(displayElem.scrollWidth)

            scaleTextToFit(); 

            console.log(first); 
            console.log(second); 
            console.log(temp); 
            console.log(operator)

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
                    console.log(operator)
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

            console.log(first); 
            console.log(second); 
            console.log(temp); 
            console.log(operator)
            
        })
    })





document.getElementById("=").addEventListener('click', (elem) => {
    if (first.length !== 0 && temp.length !== 0) {
        isEqualPressed = true; 
        second = [...temp]; 
        console.log(second)
        res = operate(first, second, operator);
        first = [res];  
        second = []; 
        temp = []; 
        // reset sign 
        sign = "+"; 
    
        displayElem.innerText = res; 
        scaleTextToFit(); 
    }
})


function operate(arr1, arr2, op) {
    let output;
    let val1 = Number(arr1.join("")); 
    let val2 = Number(arr2.join(""));  
    // console.log(typeof val1)
    // console.log(typeof val2)
    
    if (op === "+") {
        output = val1 + val2
    } else if (op === "-") {
        output = val1 - val2 
    } else if (op === "/") {
        output = val1 / val2 
    } else if (op === "*") {
        output = val1 * val2
    } 
    // console.log(output)
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





