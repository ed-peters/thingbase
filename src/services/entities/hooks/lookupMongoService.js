const { BadRequest, NotFound } = require('@feathersjs/errors');
const createService = require('feathers-mongodb');

/*
 * MongoDB service management. We connect to a different collection for each
 * type, and we wrap each of them in a Feathers service as we go. To find the
 * right collection, we need the entity type.
 * 
 * If it succeeds, this will populate two parameters:
 *   - typeObject
 *   - entityService
 */

const serviceCache = {};

// look up the type ID
const extractTypeId = (context) => {
  return (context.data || {}).typeId || (context.params.query || {}).typeId;
}

// look up the type for this operation, and fail if you can't find one
const lookupTypeObject = async (context) => {

  const typeId = extractTypeId(context);
  if (!typeId) {
    throw new BadRequest('no typeId supplied');
  }

  const typeObject = await context.app.service('types').get(typeId);
  if (!typeObject) {
    throw new NotFound(`no such typeId: ${typeId}`);
  }

  context.params.typeObject = typeObject;

  return Promise.resolve(typeObject);
};

// look up the Mongo service for this operation, and fail if you can't find one
const lookupService = async (app, name) => {

  const result = serviceCache[name];
  if (result) {
    return Promise.resolve(result);
  }

  const client = await app.get('mongoClient');
  serviceCache[name] = createService({
    Model: client.collection(name)
  });
  
  return Promise.resolve(serviceCache[name]);
};

module.exports = async (context) => {
  const typeObject = await lookupTypeObject(context);
  const entityService = await lookupService(context.app, typeObject.moniker);
  context.params.entityService = entityService;
  return context;
};
