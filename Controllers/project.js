'use strict'

var Project = require('../models/project');
var path = require('path');
var fs = require('fs');
var path = require('path');
var BASE_URL = "http://localhost:9000/api";

var controller = {
	
	home: (req, res) => {
		return res.status(200).send({
			title: 'API portafolio',
			author: "Edison Orozco",
			email: "andresorozco1206@gmail.com",
			creationYear: 2022,
			routes: {
				GET__BASE_URL: BASE_URL,
				GET__GET_PROJECTS: BASE_URL+"/projects",
				GET__GET_PROJECT: BASE_URL+"/project/:id",
				GET__GET_IMAGE: BASE_URL+"/get-image/:image",
				POST__SAVE_PROJECT: BASE_URL+"/save-project",
				POST__UPLOAD_IMAGE: BASE_URL+"/upload-image/:id",
				PUT__UPDATE_PROJECT : BASE_URL+'/update/:id',
				DELETE__DELETE_PROJECT: BASE_URL+'/delete/:id'
			}
		});
	},
	
	saveProject: (req, res) => {
		var project = new Project();

		var params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		project.save((err, projectStored) => {
			if(err) return res.status(500).send({message: 'Couldnt save the project'});

			if(!projectStored) return res.status(404).send({message: 'Failed to save project'});

			return res.status(200).send({
				message: "Porject saved",
				project: projectStored
			});
		});
	},

	getProject: (req, res) => {
		var projectId = req.params.id;

		if(projectId == null) return res.status(404).send({message: 'Project doesnt exists'});

		Project.findById(projectId, (err, project) => {

			if(err) return res.status(500).send({message: 'Failed to return data'});

			if(!project) return res.status(404).send({message: 'Project doesnt exists'});

			return res.status(200).send({
				message: "Project finded",
				project: project
			});

		});
	},

	getProjects: (req, res) => {

		Project.find({}).sort('-year').exec((err, projects) => {

			if(err) return res.status(500).send({message: 'Failed to return data'});

			if(!projects) return res.status(404).send({message: 'There are no projects to show'});

			return res.status(200).send({projects});
		});

	},

	updateProject: (req, res) => {
		var projectId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
			if(err) return res.status(500).send({message: 'Failed to update project'});

			if(!projectUpdated) return res.status(404).send({message: 'Project not found'});

			return res.status(200).send({
				message: "Project updated successfully",
				project: projectUpdated
			});
		});

	},

	deleteProject: (req, res) => {
		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
			if(err) return res.status(500).send({message: 'Failed to delete project'});

			if(!projectRemoved) return res.status(404).send({message: "Can't delete that project"});

			return res.status(200).send({
				message: "Project deleted successfully",
				project: projectRemoved
			});
		});
	},

	uploadImage: (req, res) => {
		var projectId = req.params.id;
		var fileName = 'Image dont uploaded...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({message: 'The image has not been uploaded'});

					if(!projectUpdated) return res.status(404).send({message: 'The project does not exist and the image has not been assigned'});

					return res.status(200).send({
						message: "Project image uploaded",
						project: projectUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'The file extension is invalid'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}
	},
	
	getImage: (req, res) => {
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({message: 'The image does not exist'});
			}
		});
	}
}

module.exports = controller;