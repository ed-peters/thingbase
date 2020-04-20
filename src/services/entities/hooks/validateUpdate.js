/*
 * Update schema validation. This is pretty straightforward - we need to look
 * up the type, grab its update schema, and perform the validation. We'll
 * stash the type object in the context for later use.
 * TODO can/how do we support property deletion?
 */

const { BadRequest } = require('@feathersjs/errors');
const { createApiWriteSchema, validate } = require('../../../utils/json-schema');

module.exports = async (context) => {

  const typeId = context.data.typeId;
  if (!typeId) {
    throw new BadRequest('no type ID supplied');
  }
  const typeObject = await context.app.service('types').get(typeId);
  if (!typeObject) {
    throw new BadRequest(`unknown type: ${typeId}`);
  }

  context.params.typeId = typeId;
  context.params.typeObject = typeObject;

  const schema = createApiWriteSchema(typeObject.moniker, typeObject.attributes);
  const errors = validate(schema, context.data);
  if (errors.length > 0) {
    throw new BadRequest('schema validation failed', { 
      errors: errors.map(err => `${err.dataPath}: ${err.message}`)
    });
  }

  return context;
};
