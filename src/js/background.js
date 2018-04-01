/* global chrome */

const word = 'blah';
// (function () {
//     // create a new div element
//     var newDiv = document.createElement('div');
//     // and give it some content
//     var newContent = document.createTextNode('Hi there and greetings!');
//     // add the text node to the newly created div
//     newDiv.appendChild(newContent);
//     newDiv.style.background = 'red';
//     // add the newly created element and its content into the DOM
//     var currentDiv = document.getElementById('div1');
//     document.body.insertBefore(newDiv, currentDiv);
// })())
const replaceText = (text, words) => {
    let newContent = text;

    Object.keys(words).map((word) => {
        // newContent = newContent.replace(new RegExp(words[word].synonyms.join('|'), 'ig'), '<span style="color: red">dupa</span>');
    });
    return newContent;
};

const getChildNodes = (node, words) => {
    if (node.hasChildNodes()) {
        const children = node.childNodes;

        for (let i = 0; i < children.length; i++) {
            getChildNodes(children[i], words);
        }

    } else {
        if (node.textContent) {
            console.log(node);
            node.textContent = replaceText(node.textContent, words);
        }
    }
};
window.onload = function () {
    chrome.storage.sync.get(['redux'], function (result) {
        if (result.redux) {
            const words = JSON.parse(result.redux).words;
            words && getChildNodes(document.body, words);
        }
    });
};


