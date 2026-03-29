// services/auth.service.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env'); // Assure-toi que tu as JWT_SECRET dans ton .env

async function registerUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role || 'user'
    });
    return user;
}

async function loginUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        env.jwtSecret,
        { expiresIn: '1h' }
    );

    return { token, user };
}

module.exports = { registerUser, loginUser };