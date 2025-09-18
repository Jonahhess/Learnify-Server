const { ObjectId } = require("mongodb");

function bsonObjectToJsonObject(doc) {
  if (Array.isArray(doc)) {
    return doc.map(bsonObjectToJsonObject);
  } else if (doc && typeof doc === "object") {
    const result = {};
    for (const [key, value] of Object.entries(doc)) {
      if (value instanceof ObjectId) {
        result[key] = value.toString();
      } else if (value instanceof Date) {
        result[key] = value.toISOString();
      } else if (typeof value === "object") {
        result[key] = bsonObjectToJsonObject(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  } else {
    return doc;
  }
}

module.exports = bsonObjectToJsonObject;
