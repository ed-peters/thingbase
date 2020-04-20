const { BadRequest } = require('@feathersjs/errors');

/*
 * Uniqueness checks. Attribute "monikers" have to be unique within their document,
 * and I can't seem to get Mongoose to do that.
 */

module.exports = async (context) => {
  const allNamesL = context.data.attributes.map(x => x.moniker);
  const allNamesS = new Set(allNamesL);
  if (allNamesL.length != allNamesS.size) {
    throw new BadRequest('attribute monikers have to be unique within the enclosing entity type');
  }
  return context;
};
