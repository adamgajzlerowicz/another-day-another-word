/* global chrome */

const replaceText = (text, words) => {
    let newContent = text;

    Object.keys(words).map((word) => {
        newContent = newContent.replace(new RegExp(words[word].synonyms.join('|'), 'ig'), `*${word}*`);
    });
    return newContent;
};

const update = (node, words) => {
    if (node.hasChildNodes()) {
        const children = node.childNodes;

        for (let i = 0; i < children.length; i++) {
            update(children[i], words);
        }

    } else {
        if (node.textContent) {
            node.textContent = replaceText(node.textContent, words);
        }
    }
};

window.onload = function () {
    chrome.storage.sync.get(['redux'], function (result) {
        if (result.redux) {
            const words = JSON.parse(result.redux).words;
            words && update(document.body, words);
        }
    });
};


