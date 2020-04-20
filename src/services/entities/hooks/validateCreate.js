/*
 * Intake schema validation. This is pretty straightforward - we need to look
 * up the type, grab its intake schema, and perform the validation. We'll
 * stash the type object in the context for later use.
 */

const { BadRequest } = require('@feathersjs/errors');
const { createIntakeSchema, createFullOptionalSchema, validate } = require('../../../utils/json-schema');

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

  const schema = createIntakeSchema(typeObject.moniker, typeObject.attributes);
  const errors = validate(schema, context.data);
  if (errors.length > 0) {
    throw new BadRequest('schema validation failed', { 
      errors: errors.map(err => `${err.dataPath}: ${err.message}`)
    });
  }

  // second pass of validation with everything optional, just to get the side
  // effect of setting all the default parameter values
  const secondSchema = createFullOptionalSchema(typeObject.attributes);
  console.log(JSON.stringify(secondSchema, null, 2));
  console.log(JSON.stringify(context.data, null, 2));
  validate(secondSchema, context.data);
  console.log(JSON.stringify(context.data, null, 2));

  return context;
};
