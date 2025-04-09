const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { accountsDb } = require('../config/db');

//Login route
const login = async (req, res) => {
    const { username, password } = req.body;

    accountsDb.query(
        'SELECT * FROM users where username = ? OR email = ?',
        [username, username],
        async (error, result) => {
            if (error) return res.status(500).json({ error: 'Database server error' });

            if (result.length == 0) return res.status(404).json({ error: 'User not found' });

            const user = result[0];
            const match = await bcrypt.compare(password, user.hashed_pw);

            if (!match) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET_KEY, {
                expiresIn: '5h',
            });

            //Assigning cookie to authenticated user
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });

            res.json({
                message: 'User authenticated',
                user: { id: user.id, username: user.username },
            });
        }
    );
};

//Registration route
const register = async (req, res) => {
    const { username, password, email } = req.body;

    //Query to handle cases where there is already an account with the same email
    accountsDb.query('SELECT * FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) return res.status(500).json({ error: 'Database server error' });

        if (result.length > 0)
            return res.status(400).json({
                message: 'Account already exists with that email',
            });

        const hashedPw = await bcrypt.hash(password, 10); //Hash plaintext password with a cost factor of 10, 2^10 = 1024 iterations
        accountsDb.query(
            'INSERT INTO users (username, email, hashed_pw) VALUES (?, ?, ?);',
            [username, email, hashedPw],
            (error) => {
                if (error) return res.status(500).json({ error: 'Registration error' });
                res.status(201).json({ message: 'User created' });
            }
        );
    });
};

//Logout Route
const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.json({ message: 'Logged out successfully' });
};

module.exports = { login, register, logout };
