const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const projectRouter = require('./routes/projectRouter');
const actionRouter = require('./routes/projectRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/projects', projectRouter);
app.use('/api/projects/:id/actions', actionRouter);

app.get('/api/', (req, res) => {
  res.send(`
    <h2>Welcome To API World</h2>
  `);
});

module.exports = app;
