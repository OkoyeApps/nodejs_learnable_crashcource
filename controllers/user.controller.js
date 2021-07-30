const { User } = require('../models/user.model');
const fileUtil = require('../utilities/file.util');



// create a user
exports.create = async (req, res) => {
    
    try {
        let user = new User(
            req.body.name ? req.body.name : res.send('Error: name not provided'),
            req.body.email ? req.body.email : res.send('Error: email not provided'),
            );

        user.generateUserId();

        if (!user.validate()) return res.send('Error: make sure the user name and email are provided');
        
        user = await fileUtil.create('users', {...user});
        if(user.errno) return res.status(500).send(user)

        res.send({status: 'success', data: user});

    } catch (err) {
        console.error(err);
        res.send(err);
    }

}

// retrieve a user
exports.detail = async (req, res) => {

    if (req.params.id) {
       try {
       const user = await fileUtil.find('users', req.params.id);
        
        if(!user) return res.status(404).send({ message: 'user not found', data: null });
        
        res.status(200).send({ message: 'user retrieved!', data: user });

       } catch (err) {
        res.status(500).send({ message: err, data: null });
        
       };

    } else {
        
        res.send('No file name provided')
    }

};


// list all user
exports.list = async (req, res) => {
    try {
        const users = await fileUtil.all('users');
        res.status(200).send({ message: 'users retrieved', data: users });
    
    } catch (error) {
        return res.status(404).send({ message: 'user not found', data: null });

    }
        
};


// update a user
exports.update = async (req, res) => {
  
    try {
        let user = await fileUtil.update('users', req.params.id, req.body);
        res.send(user);
    } catch (error) {
        // error
    }
}

// delete a user
exports.delete = async (req, res) => {
    let message = await fileUtil.delete('users', req.params.id);
    
    if (message.errno) return res.status(404).send(message);
    
    res.status(200).send('deletion was successful');
}

