import mongoose from "mongoose";
const indexSchema = mongoose.Schema({
  _id: Number,
  id: Number,
});

export const indexModel = mongoose.model("Index", indexSchema);

//IIFE for initializing the custom index document
(async function () {
  const count = await indexModel.find({}).count();
  if (count == 0) {
    const doc = new indexModel({ _id: 1, id: 1 });
    await doc.save();
  }
})();
