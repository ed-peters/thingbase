const types = require('./types/types.service.js');
const entities = require('./entities/entities.service.js');
const assessments = require('./assessments/assessments.service.js');
const templates = require('./templates/templates.service.js');

module.exports = function (app) {
  app.configure(types);
  app.configure(entities);
  app.configure(assessments);
  app.configure(templates);
};
