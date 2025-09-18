function convertBsonSchemaToJsonSchema(schema) {
  if (!schema || typeof schema !== "object") return schema;

  const bsonToJsonMap = {
    objectId: {
      type: "string",
      pattern: "^[a-fA-F0-9]{24}$",
    },
    date: { type: "string", format: "date-time" },
    int: { type: "integer" },
    long: { type: "integer" },
    double: { type: "number" },
    decimal: { type: "number" },
    string: { type: "string" },
    bool: { type: "boolean" },
    boolean: { type: "boolean" },
    object: { type: "object" },
    array: { type: "array" },
    null: { type: "null" },
  };

  let converted = { ...schema };

  // Map bsonType to either JSON-safe or BSON
  if (converted.bsonType) {
    const mapping = bsonToJsonMap[converted.bsonType];
    if (mapping) {
      delete converted.bsonType;
      Object.assign(converted, mapping);
    }
  }

  // Recursively convert properties
  if (converted.properties) {
    converted.properties = Object.fromEntries(
      Object.entries(converted.properties).map(([k, v]) => [
        k,
        convertBsonSchemaToJsonSchema(v),
      ])
    );
  }

  // Recursively convert array items
  if (converted.items) {
    converted.items = convertBsonSchemaToJsonSchema(converted.items);
  }

  return converted;
}

module.exports = convertBsonSchemaToJsonSchema;
