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
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    action.get(id)
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
      });
  });
  
 

module.exports = router;