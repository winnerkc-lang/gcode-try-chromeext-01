/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*****************************!*\
  !*** ./src/optPageHello.ts ***!
  \*****************************/

document.addEventListener('DOMContentLoaded', () => {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const addButton = document.getElementById('addButton');
    const resultDiv = document.getElementById('result');
    if (addButton) {
        addButton.addEventListener('click', () => {
            const num1 = parseInt(num1Input.value, 10);
            const num2 = parseInt(num2Input.value, 10);
            if (!isNaN(num1) && !isNaN(num2)) {
                chrome.runtime.sendMessage({ action: 'addNumbers', num1, num2 }, (response) => {
                    if (resultDiv) {
                        resultDiv.textContent = `Result: ${response.result}`;
                    }
                });
            }
            else {
                if (resultDiv) {
                    resultDiv.textContent = 'Please enter valid numbers.';
                }
            }
        });
    }
    const nameInput = document.getElementById('nameInput');
    const echoButton = document.getElementById('echoButton');
    const echoResult = document.getElementById('echoResult');
    if (echoButton) {
        echoButton.addEventListener('click', () => {
            const name = nameInput.value;
            if (name) {
                chrome.runtime.sendMessage({ action: 'callPostmanEcho', name }, (response) => {
                    if (echoResult) {
                        // console.log('Response from background script:', response);
                        if (response.error) {
                            echoResult.textContent = `Error: ${response.error}`;
                        }
                        else {
                            echoResult.textContent = JSON.stringify(response.data, null, 2);
                        }
                    }
                });
            }
            else {
                if (echoResult) {
                    echoResult.textContent = 'Please enter a name.';
                }
            }
        });
    }
});

/******/ })()
;
//# sourceMappingURL=optPageHello.js.map