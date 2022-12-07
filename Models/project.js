'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    langs: String,
    githubUrl: String,
    year: Number,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);
// projects --> guarda los documentos en esa colección 