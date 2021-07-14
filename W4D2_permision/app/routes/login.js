const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const users = [
    {
        username: 'bis',
        password: '456',
        role: 'admin'
    }, {
        username: 'bisrat',
        password: '123',
        role: 'member'
    }
];
router.post('/', (req, res) => {
    // Read username and password from request body
    // const { username, password } = req.body;
    const username = req.body.username
    const password = req.body.password;

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

        res.json({accessToken});
            
       
    } else {
        res.send('Username or password incorrect');
    }
});

module.exports = router;