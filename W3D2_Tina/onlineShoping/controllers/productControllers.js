const Product = require("../model/product");

module.exports.getAllProduct = (req, res, next) => {
  res.status(200).json(Product.getAll());
};

exports.save = async (req, res, next) => {
    const prod = req.body;
    console.log(prod);
    try{

      const savedProd = await new Product(
        null,
        prod.title,
        prod.price,
        prod.info
      ).save();

      res.json(savedProd);
    }catch(error){
      next(error);
    }
};

exports.findProductById = (req, res, next) => {
  res.status(200).json(Product.getProductByID(req.params.id));
};

exports.update = (req, res) => {
  const prod = req.body;
  const updateProd = new Product(
    req.params.id,
    prod.title,
    prod.price,
    prod.info
  ).update();
  res.status(200).json(updateProd);
};

exports.deleteById = (req, res, next) => {
  Product.deleteById(req.params.id);
  res.status(200).end();
};


