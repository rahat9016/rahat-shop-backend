const Product = require("../Models/Product");

const handlePrice = async (req, res, price, categoryId) => {
  try {
    let products = await Product.find({
      $and: [
        { categoryId: categoryId },
        {
          price: {
            $gte: price[0],
            $lte: price[1],
          },
        },
      ],
    })
      .populate("categoryId")
      .populate("brand")
      .exec((error, products) => {
        if (error) return res.status(400).json({ error });
        if (products) return res.status(200).json({ products });
      });
  } catch (error) {}
};
exports.allProducts = async (req, res) => {
  const { price, byCategoryId } = req.body;

  if (price !== undefined) {
    await handlePrice(req, res, price, byCategoryId);
  }
};

exports.getProductsByCategoryId = async (req, res) => {
  const { categoryId, page, perPage } = req.params;
  try {
    const currentPage = page || 1;
    await Product.find({ categoryId: categoryId })
      .skip((currentPage - 1) * perPage)
      .populate("categoryId")
      .populate("brand")
      .sort([["createdAt", "desc"]])
      .exec((error, products) => {
        if (error) return res.status(400).json({ error });
        if (products) return res.status(200).json({ products });
      });
  } catch (error) {
    console.log("error -------->", error);
  }
};
