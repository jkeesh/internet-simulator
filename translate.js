Translator = (function() {

    // This is where on the page the list of translations
    // the user has defined lives.
    var TRANSLATIONS_TABLE = '#translation-table > tbody';

    // Internal data structure to store the translations
    // we have defined.
    var translations = {};

    /** Add a translation that you will apply when receiving a message.
     *
     * After adding a translation,
     *
     * @param input: message received
     * @param output: message after translated
     */
    var addTranslation = function(input, output) {
        translations[input] = output;
        displayTranslations();
    }

    /** Translate a given message based on our rules.
     *
     * If a translation exists, apply it.
     * Otherwise, return the original mesage.
     *
     * @param message: value to translate
     * returns: translated version of the value
     */
    var translate = function(message) {
        if (translations.hasOwnProperty(message)) {
            return translations[message];
        }
        return message;
    }

    /** Display the translations we have set in a table.
     *
     * Loop over the `translations` dictionary we have defined
     * and add the data to a table on our page.
     */
    var displayTranslations = function() {
        // first, clear the table
        $(TRANSLATIONS_TABLE).html('');

        for (var input in translations) {
            var output = translations[input];
            $(TRANSLATIONS_TABLE).append(
                '<tr><td>' + input + '</td><td>' + output + '</td></tr>'
            );
        }
    }

    return {
        addTranslation: addTranslation,
        translate: translate,
        displayTranslations: displayTranslations
    }
}());
