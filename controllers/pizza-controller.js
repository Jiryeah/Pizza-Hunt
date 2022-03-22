const { Pizza } = require('../models');

const pizzaController = {
  //* the functions will go in here as methods
  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: 'comments',
        // - means that we don't want the __v field returned during the populate method
        select: '-__v',
      })
      // the query will also not include the __v field.
      .select('-__v')
      // will sort in DESC order by the _id value
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v',
      })
      .select('-__v')
      .then((dbPizzaData) => {
        // if no pizza found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No Pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //create pizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },
  // update pizza by id
  updatePizza({ params, body }, res) {
    // ' { new: true } gives the instruction to return the new updated document
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
