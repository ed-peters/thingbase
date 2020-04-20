/*
 * Escaping schemas. This allows use of shorthands like "string" to avoid having to
 * type out all the JSON schema garbage.
 */

const JSON_SCHEMA_STRING = {
  type: 'string'
};

const JSON_SCHEMA_MAPPING = {
  string: JSON_SCHEMA_STRING,
  email: { ...JSON_SCHEMA_STRING, format: 'email' },
  datetime: { ...JSON_SCHEMA_STRING, format: 'datetime' },
  'name-components': {
    type: 'object',
    required: [ 'last' ],
    properties: {
      first: JSON_SCHEMA_STRING,
      last: JSON_SCHEMA_STRING
    }
  }
};

module.exports = async (context) => {
  context.data.attributes.forEach(att => {
    const escaped = JSON_SCHEMA_MAPPING[att.jsonSchema];
    if (escaped) {
      att.jsonSchema = escaped;
    }
  });
  return context;
};
