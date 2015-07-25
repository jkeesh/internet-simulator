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
     * It loops through the message left to right and
     * applies any translations that fit until it ends.
     * If you get stuck at any point, we skip a character
     * and try again.
     *
     * @param message: value to translate
     * returns: translated version of the value
     */
    var translate = function(message) {
        var result = "";

        while (message.length > 0) {
            var madeChange = false;
            for (key in translations) {
                if (message.indexOf(key) == 0) {
                    result += translations[key];
                    message = message.substr(key.length);
                    madeChange = true;
                    break;
                }
            }
            if (!madeChange) {
                result += message[0];
                message = message.substr(1);
            }
        }
        // return translated result plus the rest of the original message
        return result + message;
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


// Set up the inputs for adding translations on the page
$(document).ready(function() {
    $('#add-translation').on('click', function() {
        var input = $('#translator-input').val();
        var output = $('#translator-output').val();
        Translator.addTranslation(input, output);

        // clear the boxes
        $('#translator-input').val('');
        $('#translator-output').val('');
    });
});
