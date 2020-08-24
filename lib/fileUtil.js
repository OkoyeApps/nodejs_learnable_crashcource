const fs = require('fs');
const path = require('path');
const helper = require('./helper')
var lib = {
    baseDir: path.join(__dirname, '/../.data/')
};

//creating
lib.create = (dir, filename, data, callback) => {
    //open file for writing
    const filePath = lib.baseDir + dir + "\\" + filename + '.json';
    fs.open(filePath, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            //convert the data to string
            const stringData = JSON.stringify(data);
            //write th file and close it
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if (!err) {
                    fs.close(fileDescriptor, (err) => {
                        if (!err) {
                            callback(false);
                        } else {
                            callback("Error closing the new file");
                        }
                    });
                } else {
                    callback("Error writing to new file");
                }
            });

        } else {
            callback("could not creat new file, it may already exist");
        }
    });
};

//reding

lib.read = (dir, filename, callback) => {
    const filePath = lib.baseDir + dir + "\\" + filename + '.json';
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
            callback(false, JSON.parse(data));
        }
        else {
            callback(err, data);
        }
    });
};

//updating
lib.update = (dir, filename, data, callback) => {
    const filePath = lib.baseDir + dir + "\\" + filename + '.json';
    //open the file
    fs.open(filePath, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            fs.readFile(fileDescriptor, 'utf-8', (err, bookToUpdate) => {
                if (!err && bookToUpdate) {
                    let updatedBook = helper.formatObject(JSON.parse(bookToUpdate), data);
                    var updatedData = JSON.stringify(updatedBook);
                    //truncate the fule for update;
                    fs.truncate(fileDescriptor, (err) => {
                        if (!err) {
                            fs.writeFile(fileDescriptor, updatedData, (err) => {
                                if (!err) {
                                    fs.close(fileDescriptor, (err) => {
                                        if (!err) {
                                            callback(false);
                                        } else {
                                            callback("error closing the file");
                                        }
                                    });
                                } else {
                                    callback('error writing to existing file');
                                }
                            });
                        }
                    });
                } else {
                    callback(err);
                }
            });



        } else {
            callback('could not open file for updating, maybe it does not exist');
        }
    });
};

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

module.exports = lib;