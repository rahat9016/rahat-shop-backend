const Product = require("../Models/Product");

const handlePrice = async (req, res, price, categoryId) => {
  try {
    await Product.find({
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
const handleStar = async (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$reviews.star" },
        },
      },
    },
    {
      $match: { floorAverage: stars },
    },
  ])
    .limit(12)
    .exec((error, aggregate) => {
      Product.find({ _id: aggregate })
        .populate("categoryId")
        .populate("brand")
        .exec((error, aggregate) => {
          res.json({ products });
        });
    });
};
const handleShipping = async (req, res, shipping) => {
  await Product.find({ shipping })
    .populate("categoryId")
    .populate("brand")
    .limit(12)
    .exec((error, products) => {
      res.json({ products });
    });
};
const handleColor = async (req, res, color) => {
  await Product.find({ color })
    .populate("categoryId")
    .populate("brand")
    .limit(12)
    .exec((error, products) => {
      res.json({ products });
    });
};
const handleBrand = async (req, res, brandId) => {
  await Product.find({ brand: brandId })
    .populate("categoryId")
    .populate("brand")
    .limit(12)
    .exec((error, products) => {
      res.json({ products });
    });
};

exports.allProducts = async (req, res) => {
  const { price, byCategoryId, stars, shipping, color, brand } = req.body;

  if (price !== undefined) {
    await handlePrice(req, res, price, byCategoryId);
  } else if (stars) {
    await handleStar(req.res, stars);
  } else if (shipping) {
    await handleShipping(req, res, shipping);
  } else if (color) {
    await handleColor(req, res, color);
  } else if (brand) {
    await handleBrand(req, res, brand);
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
