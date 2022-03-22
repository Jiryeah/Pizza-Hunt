const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Acts as middleware to transform the data before it gets to the controllers.
      // Every time a pizza is retrieved, the value will be formatted by the dateFormat()
      // and used instead of the default timestamp.
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: 'Large',
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        // tells the Pizza model which documents to search to find the right comments
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// creates the Pizza model using the PizzaSchema from above
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
