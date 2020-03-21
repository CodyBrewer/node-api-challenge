const express = require('express');
const Project = require('../../data/helpers/projectModel');
const {
  validateProjectID,
  validateProject,
  requiredBody,
} = require('../../middleware');

const idBodyCheck = [validateProjectID, requiredBody];
const router = express.Router();


router.use((req, res, next) => {
  console.log('project Router');
  next();
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.get();
    if (projects) {
      res.status(200).json({ message: 'Projects Found: ', projects });
    } else {
      res.status(404).json({ message: 'No Projects Found In Database' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error while trying to get projects. Check Server Logs.' });
  }
});

router.get('/:id', validateProjectID, async (req, res) => {
  const { project } = req;
  if (project) {
    res.status(200).json({ message: 'Project Found', project });
  }
});

router.post('/', validateProject, async (req, res) => {
  const { project } = req;
  if (project) {
    try {
      const inserted = await Project.insert(project);
      if (inserted) {
        res.status(201).json({ message: 'Insert Project Succes', inserted });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error, Check server logs' });
      console.error(error.message);
    }
  }
});

router.delete('/:id', validateProjectID, async (req, res) => {
  const { id } = req.project;
  try {
    const count = await Project.remove(id);
    if (count > 0) {
      res.status(200).json({ message: 'The project has been cancelled' });
    } else {
      res
        .status(404)
        .json({ message: 'The project could not be found, probably funding' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error cancelling the project',
    });
    console.error(error);
  }
});

router.put('/:id', idBodyCheck, async (req, res) => {
  const { id } = req.project;
  const { body } = req;
  console.log(id);
  console.log(body);
  try {
    const project = await Project.update(id, body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating the project',
    });
    console.error(error);
  }
});


module.exports = router;
