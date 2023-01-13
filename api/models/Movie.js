const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    quote: {
      type: String,
    },
    type: { type: String },
    imgBig: {
      type: String,
    },
    imgSmall: {
      type: String,
    },
    trailer: {
      type: String,
    },
    year: {
      type: String,
    },
    limits: {
      type: Number,
    },
    genres: {
      type: [String],
    },
    duration: {
      type: String,
    },
    actors: {
      type: [String],
    },
    director: {
      type: String,
    },
    ratings: {
      type: [],
      default: [],
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);
MovieSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Movie', MovieSchema);
