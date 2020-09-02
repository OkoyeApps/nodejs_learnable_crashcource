var helper = {};


helper.generateRandomString = (stringLength) => { 
    stringLength = typeof(stringLength) === 'number' ? stringLength : 20;
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var str = '';
    for(i = 0; i < stringLength; i++){
        var randomChar = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        str+= randomChar;
    }
    return str;
}

helper.processUpdate = (oldObject = {}, newObject ={}) => {

    for (let [property, value] of Object.entries(newObject)) {
        if (!oldObject.hasOwnProperty(property)) {
            continue;
        }
        oldObject[ property ] = value;
    }

    return oldObject;
}


module.exports = helper;
