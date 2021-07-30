class _JSON{

    /**
     * converts each array element (jsonString) to JS object 
     * @param {*} [jsonString] 
     */
    static decode(jsonArray) {
        return jsonArray.map((element) => {
            return JSON.parse(element);
        })
    }
}

exports._JSON = _JSON;