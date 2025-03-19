const express = require ('express');
const Project = require('../models/Project');
const router = express.Router();


router.post('/', async (req, res) => {
    const {name, description, startDate, endDate, budget, createBy} = req.body;

    try {
        const project = new Project({ neme, description, startDate, endDate, budget, createdBy});
        await project.save();
        res.status(201).json(project);
    }catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.get('/' , async (req, res) => {
     try {
        const projects = await Project.find().populate('createBy', 'username');
        res.status(200).json(projects);
     }catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
     }
});

router.get('/:id' , async (req, res) => {
      try {
        const project = await Project.findById(req.params.id).populate('creactedBy', 'username');
        if (!project) {
            return res.status(404).json({ messgae: 'Project not found' 
            });
        }
        res.status(200).json(project);
      }catch (error){
        res.status(500).json({ message : 'Something went wrong'});
      }
});


router.put('/:id' , async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!project) {
            return res.status(404).json({ messgae : 'Project not found' 
            });
        }
        res.status(200).json(project);
    }catch (error) {
        res.status(500).json({ message : 'Something went wrong'});
    }
});

