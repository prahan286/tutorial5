/*
Name: Kevin Tuvar
ID: B00893112
References :

https://www.geeksforgeeks.org/design-first-application-using-express/ = For Expressjs

https://medium.com/@adames/generating-unique-ids-4c18dcf26a79 = Generating ID

*/

const express = require('express');
const app = express();

// Enable JSON parsing for POST requests
app.use(express.json());

app.set('json spaces', 2);

let users = {
    "message": "Users retrieved",
    "success": true,
    "users": [
        {
            "email": "abc@abc.ca",
            "firstName": "ABC",
            "id": "5abf6783"
        },
        {
            "email": "xyz@xyz.ca",
            "firstName": "XYZ",
            "id": "5abf674563"
        }
    ]
};

// Route to get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Route to add a new user
app.post('/add', (req, res) => {
    if (!req.body.email || !req.body.firstName) {
        return res.status(400).json({
            message: "Email Id or Name Doesn't Exists",
            success: false
        });
    }

    // Create a new user object with a unique ID using a timestamp
    const newUser = {
        email: req.body.email,
        firstName: req.body.firstName,
        id: Date.now().toString(),
    };

    users.users.push(newUser); // Add the new user to the array

    // Respond with a success message
    res.json({
        message: "User added",
        success: true
    });
});

// Route to update an existing user
app.put('/update/:id', (req, res) => {
    // Find the index of the user with the given id
    const index = users.users.findIndex(u => u.id === req.params.id);

    // If user not found, return 404
    if (index === -1) return res.status(404).json({
        message: "The user with the given ID doesn't exist.",
        success: false
    });

    // Updating the user's email and firstName
    if (req.body.email) {
        users.users[index].email = req.body.email;
    }
    if (req.body.firstName) {
        users.users[index].firstName = req.body.firstName;
    }

    // Respond with a success message
    res.json({
        message: "User Updated",
        success: true
    });
});

// Route to get a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.users.find(u => u.id === req.params.id); // Find the user by ID
    if (!user) return res.status(404).json({
        message: "The user with the given ID doesn't exist.",
        success: false
    });

    res.json(user);
});

// Server listening on port 3000
const port = 3000;
app.listen(port, () => console.log(`Listening on port number ${port}`));
