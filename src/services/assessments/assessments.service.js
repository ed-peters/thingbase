// Initializes the `assessments` service on path `/assessments`
const { Assessments } = require('./assessments.class');
const hooks = require('./assessments.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/assessments', new Assessments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('assessments');

  service.hooks(hooks);
};
