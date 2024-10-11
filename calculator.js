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
            temp.push(elem.innerText); 
            displayElem.innerText = temp.join("");
            if (displayElem.scrollWidth > displayContainerElem.clientWidth-20) {
                scaleTextToFit();
            } else {
                displayElem.style.fontSize = '50px'; 
            }

            console.log(elem.innerText); 
        })
    })


document.querySelectorAll(".js-operator-button")
    .forEach((elem) => {
        elem.addEventListener("click", () => {
            if (first.length === 0) {
                first = [...temp]; 
                temp = [];  
            } else if (second.length === 0) {
                second = [...temp]; 
                res = operate(first, second, operator);
                first = [res];  
                second = []; 
                temp = [];  

                displayElem.innerText = res; 
                console.log(displayElem.scrollWidth)
                if (displayElem.scrollWidth > displayContainerElem.clientWidth-20) {
                    scaleTextToFit();
                } else {
                    displayElem.style.fontSize = '50px'; 
                }
                   
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
    if (displayElem.scrollWidth > displayContainerElem.clientWidth-20) {
        scaleTextToFit();
    } else {
        displayElem.style.fontSize = '50px'; 
    }
})


document.querySelector(".js-ac-button").addEventListener('click', clear); 


function operate(arr1, arr2, op) {
    let val1 = Number(arr1.join("")); 
    let val2 = Number(arr2.join("")); 
    let output; 
    
    if (op === "+") {
        output = val1 + val2
    } else if (op === "-") {
        output = val1 - val2 
    } else if (op === "/") {
        output = val1 / val2 
    } else if (op === "*") {
        output = val1 * val2
    } 
    return output
}


function scaleTextToFit() {
    let fontSize = 100; 
    displayElem.computedStyleMap.fontSize = fontSize + 'px'; 

    while (displayElem.scrollWidth > (displayContainerElem.clientWidth-20)) {
        fontSize--; 
        displayElem.style.fontSize = fontSize + 'px'; 
    }
}

function clear() {
    let temp = []; 
    let first = []; 
    let second = []; 
    let operator;
    let res; 
    displayElem.innerText = 0; 
    displayElem.style.fontSize = '50px'; 
}





