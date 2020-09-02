const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const helper = require('./helper')


var lib = {
    baseDir: path.join(__dirname, '/../database/')
};

//creating
// lib.create = (dir, filename, data, callback) => {
//     //open file for writing
//     const filePath = lib.baseDir + dir + "\\" + filename + '.json';
//     fs.open(filePath, 'wx', (err, fileDescriptor) => {
//         if (!err && fileDescriptor) {
//             //convert the data to string
//             const stringData = JSON.stringify(data);
//             //write th file and close it
//             fs.writeFile(fileDescriptor, stringData, (err) => {
//                 if (!err) {
//                     fs.close(fileDescriptor, (err) => {
//                         if (!err) {
//                             // callback(false); //Header already set error
//                             return false;
//                         } else {
//                             callback("Error closing the new file");
//                         }
//                     });
//                 } else {
//                     callback("Error writing to new file");
//                 }
//             });

//         } else {
//             callback("could not creat new file, it may already exist");
//         }
//     });
// };


exports.create = async (dir, data={}) => {
     try {
        const filename = helper.generateRandomString(30);

        const filePath = lib.baseDir + dir + "\\" + filename + '.json';
        const fileHandle = await fsPromises.open(filePath, 'wx');
        data['filename'] = filename;
        let jsonData = JSON.stringify(data);
    
        await fsPromises.writeFile(fileHandle, jsonData);
        await fileHandle.close();
    
        let fileContent = await fsPromises.readFile(filePath, 'utf-8');
        fileContent = JSON.parse(fileContent);
        
        return fileContent;
     } catch (err) {
         console.error(err);
         return err;
     }

}


// read one file
exports.find = async (dir, filename) => {

    try {
        const filePath = lib.baseDir + dir + "\\" + filename + '.json';
        const content = await fsPromises.readFile(filePath, 'utf-8');
 
        return JSON.parse(content);
    } catch (err) {
        console.error(err);
        throw Error(err)
    }

}


const {_JSON} = require('./json.util');

// get all
exports.all = async (dir) => {
    const fileDir = lib.baseDir + dir;

    try {

        const files = await fsPromises.readdir(fileDir);

        // read all files at ones and return
        return Promise.all(files.map((file) => {

                let filePath = fileDir + '\\' + file;

                const content = fsPromises.readFile(filePath, 'utf-8');

                return content;
            })
        )
        .then((_files)=> {
            let _json = _JSON.decode(_files);
            
            return {count: _json.length, books: _json};

        }).catch((err) => {
            console.error(err);
            throw Error(err);
        });

    } catch (err) {
        console.error(err);
        throw Error(err);

    }

}

// update an file
exports.update = async (dir, filename, data) => {
    
    try {
        const filePath = lib.baseDir + dir + "\\" + filename + '.json';
        // open the file for read from and writing into the file
        const fileHandle = await fsPromises.open(filePath, 'r+');

        const fileContent = await fsPromises.readFile(fileHandle, 'utf-8');
        
        await fileHandle.close();
        
        // update the file content with data (request data) provided
        let updatedContent = helper.formatObject(JSON.parse(fileContent), data);
        
        updatedContent = JSON.stringify(updatedContent);

        // truncate the file for update
        await fsPromises.truncate(filePath)

        await fsPromises.writeFile(filePath, updatedContent);

        return JSON.parse(updatedContent);

    } catch (error) {
        console.error('error', error);
        throw Error(error);
    }

}

//Delete File
lib.delete = (dir, filename, callback) => {
    const filePath = lib.baseDir + dir + "\\" + filename + '.json';
    fs.unlink(filePath, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback(err);
        }
    });
};

// delete a  file
exports.delete = async (dir, filename) => {
    try {

        const filePath = lib.baseDir + dir + "\\" + filename + '.json';
        // if the file exist
        await fsPromises.access(filePath);
        await fsPromises.unlink(filePath);

        return true;

    } catch (error) {
        console.error('error', error);
        return error;
    }
}

// module.exports = lib;