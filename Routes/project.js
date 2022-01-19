'use strict'

var express = require('express');
const { deleteProject } = require('../Controllers/project');

var ProjectController = require('../Controllers/project');
var router = express.Router();

// Middleware
var multiparty = require('connect-multiparty');
var multipartMiddleware = multiparty({uploadDir: './uploads'});


// Rutas
router.get('/', ProjectController.home);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.get('/get-image/:image', ProjectController.getImage);

router.post('/save-project', ProjectController.saveProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

router.put('/update/:id', ProjectController.updateProject);

router.delete('/delete/:id', ProjectController.deleteProject);

module.exports = router;