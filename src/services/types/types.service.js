const { Service } = require('feathers-mongoose');
const createModel = require('../../models/types.model');
const hooks = require('./types.hooks');

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

class Types extends Service {

  async get(id, params) {
    // this allows someone to request a type either by Mongo object ID or by its
    // more friendly "moniker" (which is also unique)
    if (!objectIdRegex.test(id)) {
      const result = await this.find({ query: { moniker: id } }, params);
      return Promise.resolve(result.data[0]);
    }
    return super.get(id, params);
  }
};

module.exports = function (app) {

  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  app.use('/types', new Types(options, app));
  app.service('types').hooks(hooks);
};
