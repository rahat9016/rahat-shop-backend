const Product = require("../Models/Product");

const handlePaginationProducts = async (
  req,
  res,
  page,
  perPage,
  categoryId
) => {
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
  } catch (error) {}
};
// Price Handler
const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
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
  const { page, perPage, categoryId, price } = req.body;
  if (categoryId) {
    await handlePaginationProducts(req, res, page, perPage, categoryId);
  }
  if (price !== undefined) {
    await handlePrice(req, res, price);
  }
};
