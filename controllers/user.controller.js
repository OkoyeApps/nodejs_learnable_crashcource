const { User } = require('../models/user.model');
const fileUtil = require('../utilities/file.util');



// create a user
exports.create = async (req, res) => {
    
    try {
        let user = new User(
            req.body.name ? req.body.name : res.send('Error: name not provided'),
            req.body.email ? req.body.email : res.send('Error: email not provided'),
            )
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
