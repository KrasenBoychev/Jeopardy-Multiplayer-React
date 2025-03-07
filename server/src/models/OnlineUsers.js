const { Schema, model } = require('mongoose');

const OnlineUsersSchema = new Schema({
    onlineUsers: {
        type: Array,
    }
});

const OnlineUsers = model('onlineUsers', OnlineUsersSchema);
OnlineUsers.createIndexes();

module.exports = { OnlineUsers };