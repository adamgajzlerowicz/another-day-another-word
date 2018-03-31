const word = 'uncanny';


const replaceText = (text, synonyms) => {
    return text.replace(new RegExp(synonyms.join('|'), 'ig'), word);
};
const getChildNodes = (node, synonyms) => {
    if (node.hasChildNodes()) {
        const children = node.childNodes;

        for (let i = 0; i < children.length; i++) {
            getChildNodes(children[i], synonyms);
        }

    } else {
        if (node.textContent) {
            node.textContent = replaceText(node.textContent, synonyms);
        }
    }
};

fetch('https://words.bighugelabs.com/api/2/2907f195ac339d6cc7021a2280796049/' + word + '/json')
    .then(r => r.json())
    .then(synonyms => {
        const verbs = synonyms.verb ? synonyms.verb.syn : [];
        const adjective = synonyms.adjective ? synonyms.adjective.syn : [];
        const nouns = synonyms.noun ? synonyms.noun.syn : [];
        const allWords = adjective.concat(verbs.concat(nouns));
        allWords && getChildNodes(document.body, allWords);
    });
