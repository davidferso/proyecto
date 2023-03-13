const mongoose = require('mongoose')

const IdeaSchema = new mongoose.Schema({
    idea: {
        type: String,
        required: [true, "Por favor ingresa alguna idea"]
    },
    like: {
        user: {
            type: String,
            required: [true]
        },
        alias: {
            type: String,
            required: [true]
        },
        email: {
            type: String,
            required: [true]
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Idea', IdeaSchema)