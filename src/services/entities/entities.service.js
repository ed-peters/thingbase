const hooks = require('./entities.hooks');

class Entities {

  async find(params) {
    return params.entityService.find(params);
  }

  async get(id, params) {
    return params.entityService.get(id, params);
  }

  async create(data, params) {
    return params.entityService.create(data, params);
  }

  async patch(id, data, params) {
    return params.entityService.patch(id, data, params);
  }

  async remove(id, params) {
    return params.entityService.remove(id, params);
  }
};

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  const path = '/entities';
  app.use(path, new Entities(options, app));
  app.service(path).hooks(hooks);
};
