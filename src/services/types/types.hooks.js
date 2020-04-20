const { NotImplemented } = require('@feathersjs/errors');
const ensureUniqueAttributeMonikers = require('./hooks/ensureUniqueMonikers');
const escapeAttributeSchema = require('./hooks/escapeAttributeSchema');
const assignDefaultValues = require('./hooks/assignDefaultValues');

const notImplemented = async () => {
  throw new NotImplemented();
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      ensureUniqueAttributeMonikers,
      escapeAttributeSchema,
      assignDefaultValues
    ],
    update: [ notImplemented ],
    patch: [ notImplemented ],
    remove: [ notImplemented ]
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
