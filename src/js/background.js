/* global chrome */

const replaceText = (text, words) => {
    chrome.extension.getBackgroundPage().console.log('here');
    // return text.replace(new RegExp(words.join('|'), 'ig'), word);
};

const getChildNodes = (node, words) => {
    if (node.hasChildNodes()) {
        const children = node.childNodes;

        for (let i = 0; i < children.length; i++) {
            getChildNodes(children[i], words);
        }

    } else {
        if (node.textContent) {
            chrome.extension.getBackgroundPage().console.log(node);
            node.textContent = replaceText(node.textContent, words);
        }
    }
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {

        chrome.storage.sync.get(['redux'], function (result) {
            const words = JSON.parse(result.redux).words;

            words && getChildNodes(document.body, words);
        });
        chrome.extension.getBackgroundPage().console.log(chrome.extension.getBackgroundPage());
    }
});
