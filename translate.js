Translator = (function() {
    var translations = {};

    var addTranslation = function(input, output) {
        translations[input] = output;
    }

    var translate = function(value) {
        if (translations.hasOwnProperty(value)) {
            return translations[value];
        }
        return value;
    }

    return {
        addTranslation: addTranslation,
        translate: translate
    }
}());
