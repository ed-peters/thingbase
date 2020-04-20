const Required = (type, defaultValue) => ({
  required: true,
  default: defaultValue,
  type
});

const Enum = (values) => ({
  required: true,
  type: String,
  enum: values,
  default: values[0]
});

module.exports = function (app) {
  
  const modelName = '_types';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const IntakePermission = Enum([
    'REQUIRED',
    'ALLOWED',
    'NONE'
  ]);

  const ApiPermission = Enum([
    'READ',
    'READ_WRITE',
    'NONE'
  ]);

  const AssessmentPermission = Enum([
    'READ',
    'READ_WRITE',
    'NONE'
  ]);

  const AttributeSchema = {
    moniker: Required(String),
    displayName: Required(String),
    jsonSchema: Required(Object),
    sinceRevision: Required(Number),
    intakePermission: IntakePermission,
    apiPermission: ApiPermission,
    assessmentPermission: AssessmentPermission,
    _id: false
  };

  const EntityTypeSchema = new Schema({
    moniker: Required(String),
    displayName: Required(String),
    attributes: [ AttributeSchema ],
    intakeSchema: Required(Object),
    apiReadSchema: Required(Object),
    apiWriteSchema: Required(Object)
  }, {
    timestamps: true,
    versionKey: '_revision'
  });
  EntityTypeSchema.index({ moniker: 1 }, { unique: true });

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, EntityTypeSchema);
};
