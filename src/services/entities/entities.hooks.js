const { NotImplemented } = require('@feathersjs/errors');
const validateCreate = require('./hooks/validateCreate');
const validateUpdate = require('./hooks/validateUpdate');
const lookupMongoService = require('./hooks/lookupMongoService');

const notImplemented = async () => {
  throw new NotImplemented();
}

module.exports = {
  before: {
    all: [],
    find: [ 
      lookupMongoService
    ],
    get: [ 
      lookupMongoService
    ],
    create: [
      lookupMongoService,
      validateCreate
    ],
    update: [ notImplemented ],
    patch: [
      lookupMongoService,
      validateUpdate
    ],
    remove: [ 
      lookupMongoService
     ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
