let temp = []; 
let first = []; 
let second = []; 
let operator;
let res; 


let displayContainerElem = document.querySelector(".display-container"); 
let displayElem = document.querySelector(".js-display-text"); 

document.querySelectorAll(".js-digit-button")
    .forEach((elem) => {
        elem.addEventListener("click", () => {
            // handle leading zero
            if (elem.innerText === "0" && temp.length === 0) {
                return 
            }
            temp.push(elem.innerText); 
            displayElem.innerText = temp.join("");
            console.log(displayElem.scrollWidth)

            scaleTextToFit(); 

            // console.log(elem.innerText); 
        })
    })



document.querySelectorAll(".js-operator-button")
    .forEach((elem) => {
        elem.addEventListener("click", () => {
            if (first.length === 0) {
                first = [...temp]; 
                temp = [];  
            } else if (second.length === 0) {
                // dont' do anything, if "=" operator 
                // was pressed earlier and temp is empty
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

            // console.log(first); 
            // console.log(second); 
            // console.log(temp); 
            // console.log(operator)
            
        })
    })


document.getElementById("=").addEventListener('click', (elem) => {
    second = [...temp]; 
    res = operate(first, second, operator);
    first = [res];  
    second = []; 
    temp = []; 

    displayElem.innerText = res; 
    console.log(displayElem.scrollWidth)

    scaleTextToFit(); 
})


document.querySelector(".js-ac-button").addEventListener('click', _clear); 


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

    displayElem.innerText = 0; 
    displayElem.style.fontSize = '50px'; 

}





