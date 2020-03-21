const Project = require('../../data/helpers/projectModel');
const Action = require('../../data/helpers/actionModel');

const validateProjectID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: 'Project Not Found; invalid id.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to process request.' });
  }
};

const validateActionID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const action = await Action.get(id);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: 'Action not found; Invalid id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Failed to process request; Check Server Logs' });
    console.log(error);
  }
};

const validateProject = async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(401).json({ message: 'Missing Information from body: A project requires a name and description.' });
  } else {
    req.project = req.body;
    next();
  }
};

const requiredBody = async (req, res, next) => {
  const { body } = req;
  if (!body) {
    res.status(401).json({ message: 'JSON Body Required to Create & Update Data' });
  } else {
    next();
  }
};

module.exports = {
  validateProjectID,
  validateActionID,
  validateProject,
  requiredBody,
}