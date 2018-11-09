const express = require('express');
const action = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    const { id } = req.params;
    action.get(id)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the actions", error: err });
      });
  });
  
  router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const actions = await action.get(id);
        if (actions) {
            res.status(200).json(actions);
          } else {
            res.status(404).json({ message: 'action not found' });
          }
    } catch (error) {
        res
        .status(500)
        .json({ message: "we failed you, can't get the action", error: err });
    }

    /*action.get(id)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: 'action not found' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the action", error: err });
      });*/
  });
  
  router.post('/', async (req, res) => {
    console.log('body', req.body);
    try {
      const actionData = req.body;
      const actionId = await action.insert(actionData);
      const actions = await action.get(actionId.id);
      res.status(201).json(actions);
    } catch (error) {
      let message = 'error creating the action';
  
      if (error.errno === 19) {
        message = 'please provide a project id, a description, notes, and if it is completed';
      }
  
      res.status(500).json({ message, error });
    }
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    action.update(id, changes)
    .then(actionUpdate => {
      if (actionUpdate) {
        res.status(200).json({ message: 'action updated' });
      } else {
        res.status(404).json({ message: 'action not found' })
      }
      
    })
    .catch(err => {
      res.status(500).json({ message: 'error updating the action', err });
    })
  });
  
  router.delete('/:id', (req, res) => {
    action.remove(req.params.id)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json({ message: 'error deleting action', err });
      });
  });

module.exports = router;