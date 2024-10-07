const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, maxLength: 100 },
 
  stock: { type: Number, required: true, default: 0, min: 0 },

});

// an item can have multiple categories

// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
