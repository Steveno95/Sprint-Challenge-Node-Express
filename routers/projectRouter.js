const express = require('express');
const project = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    const { id } = req.params;
    project.get(id)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the project", error: err });
      });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    project.get(id)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: 'project not found' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the project", error: err });
      });
  });

  router.get('/actions/:id', (req, res) => { //this basically does the same thing as above but uses the getProjectActions
    const id = req.params.id;
    project.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => res.status(500).json({error: `Error reading actions for projec with the id:${id}`}));
  });

  
  router.post('/', async (req, res) => {
    console.log('body', req.body);
    try {
      const projectData = req.body;
      const projectId = await project.insert(projectData);
      const projects = await project.get(projectId.id);
      res.status(201).json(projects);
    } catch (error) {
      let message = 'error creating the project';
  
      if (error.errno === 19) {
        message = 'please provide both the name and a description';
      }
  
      res.status(500).json({ message, error });
    }
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    project.update(id, changes)
    .then(projectUpdate => {
      if (projectUpdate) {
        res.status(200).json({ message:  'project updated' });
      } else {
        res.status(404).json({ message: 'project not found' })
      }
      
    })
    .catch(err => {
      res.status(500).json({ message: 'error updating project', err });
    })
  });
  
  router.delete('/:id', (req, res) => {
    project.remove(req.params.id)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json({ message: 'error deleting project', err });
      });
  });

  module.exports = router;