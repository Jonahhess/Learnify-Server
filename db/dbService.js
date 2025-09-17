const client = require("./connectToMongoDB");

const findOne = async (db, coll, filter, update) => {
  const database = client.db(db);
  const collection = database.collection(coll);
  const find = await collection.findOneAndUpdate(filter, update);
};

const updateOne = async (db, coll, filter, update) => {
  const database = client.db(db);
  const collection = database.collection(coll);
  const update = await collection.findOneAndUpdate(filter, update);
};
