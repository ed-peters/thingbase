/*
 * Default values. These can be assigned using Mongoose, but we need some of them
 * in place for schema generation, before the model is persisted.
 */

module.exports = async (context) => {
  context.data.attributes.forEach(att => {
    att.intakePermission = att.intakePermission || 'REQUIRED',
    att.apiPermission = att.apiPermission || 'READ',
    att.assessmentPermission = att.assessmentPermission || 'READ'
    att.sinceRevision = 0;
  });
  return context;
};
