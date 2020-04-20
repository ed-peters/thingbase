const Ajv = require('ajv');

const Required = (type, defaultValue) => ({
  required: true,
  default: defaultValue,
  type
});

const RequiredEnum = (values) => ({
  required: true,
  type: String,
  enum: values,
  default: values[0]
});

const createIntakeSchema = (moniker, atts) => {
  const schema = {
    type: 'object',
    properties: {
      typeId: {
        type: 'string',
        enum: [ moniker ]
      }
    },
    required: [],
    additionalProperties: false
  };
  atts.forEach(att => {
    if (att.intakePermission !== 'NONE') {
      schema.properties[att.moniker] = att.jsonSchema;
      if (att.intakePermission === 'REQUIRED') {
        schema.required.push(att.moniker);
      }
    }
  });
  return schema;
};

const createApiWriteSchema = (moniker, atts) => {
  const schema = {
    type: 'object',
    properties: {
      typeId: {
        type: 'string',
        enum: [ moniker ]
      }
    },
    additionalProperties: false
  };
  atts.forEach(att => {
    if (att.apiPermission === 'READ_WRITE') {
      schema.properties[att.moniker] = att.jsonSchema;
    }
  });
  return schema;
};

const createApiReadSchema = (atts) => {
  const schema = {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: true
  };
  atts.forEach(att => {
    if (att.apiPermission !== 'NONE') {
      schema.properties[att.moniker] = att.jsonSchema;
      if (att.intakePermission === 'REQUIRED') {
        schema.required.push(att.moniker);
      }
    }
  });
  return schema;
};

const createFullOptionalSchema = (atts) => {
  const schema = {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: true
  }
  atts.forEach(att => {
      schema.properties[att.moniker] = att.jsonSchema;
  });
  return schema;
};

const validator = new Ajv({
  allErrors: true,
  useDefaults: true
});

const validate = (schema, data) => {
  const valid = validator.validate(schema, data);
  return valid ? [] : validator.errors;
};

module.exports = {
  Required,
  RequiredEnum,
  validate,
  createIntakeSchema,
  createApiReadSchema,
  createApiWriteSchema,
  createFullOptionalSchema
}