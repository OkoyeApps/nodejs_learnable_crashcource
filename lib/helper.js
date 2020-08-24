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

helper.formatObject = (oldObject = {}, newObject ={}) => {
    let tempObj  = {}
    Object.keys(newObject).map(key => {
        if(oldObject.hasOwnProperty(key)){
            tempObj[key] = newObject[key];
        }
    })
    return {...oldObject, ...tempObj};
}

module.exports = helper;