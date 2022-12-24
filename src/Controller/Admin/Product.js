const { default: slugify } = require("slugify");
const Product = require("../../Models/Product");
const User = require("../../Models/User");
exports.addProduct = async (req, res) => {
  const { keyFeatures, values, productPictures } = req.body;

  let ProductImg = [];
  let productKeyFeatures = [];
  if (productPictures) {
    ProductImg = productPictures.map((file) => {
      return { url: file.url, public_key: file.public_key };
    });
  }
  if (productKeyFeatures) {
    productKeyFeatures = keyFeatures.map((key) => {
      return { key: key };
    });
  }
  console.log(req.body);
  const {
    name,
    quantity,
    description,
    price,
    categoryId,
    brand,
    color,
    shipping,
  } = values;

  try {
    const slug = slugify(name);
    if (name) {
      const product = await new Product({
        name,
        slug,
        quantity,
        description,
        price,
        categoryId,
        productPictures: ProductImg,
        brand,
        color,
        shipping,
        createBy: req.user._id,
        keyFeatures: productKeyFeatures,
      });
      product.save((error, product) => {
        if (error) return res.status(400).json({ error: error });
        if (product) {
          res.status(201).json({
            message: "Product create successful!",
            product: product,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getAllProducts = async (req, res) => {
  const products = await Product.find({})
    .populate("categoryId", "_id title slug parentId")
    .populate("brand")
    .exec();
  res.status(200).json({ products: products });
};
exports.getProductById = async (req, res) => {
  await Product.findById({ _id: req.params.id })
    .populate("brand")
    .populate("reviews.postedBy")
    .exec((error, data) => {
      if (error) return res.status(400).json({ error });
      else if (data) {
        res.status(200).json({ product: data });
      }
    });
};
exports.relatedProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    categoryId: product.categoryId,
  })
    .limit(3)
    .populate("categoryId")
    .populate("reviews.postedBy")
    .populate("brand");
  res.status(200).json(related);
};
// Remove product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    Product.findByIdAndDelete({ _id: id }).exec((error, data) => {
      if (error) return res.status(400).json({ error });
      else if (data)
        return res
          .status(204)
          .json({ message: "Product Deleted successful", data });
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!", error });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  let productPictures = [];
  if (req.files.length > 0 && req.files) {
    productPictures = req.files.map((file) => {
      return { img: process.env.API + "/public/" + file.filename };
    });
  }
  try {
    await Product.findById({ _id: id }).exec(async (error, product) => {
      if (error) return res.status(400).json({ error: error });
      else if (product) {
        const updated = await Product.findByIdAndUpdate(
          { _id: id },
          { $set: { ...req.body, productPictures } },
          {
            new: true,
          }
        ).exec();
        console.log(updated);
        res.status(200).json(updated);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.productCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.status(200).json({ total });
};
// product review
exports.productStart = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ _id: req.user._id }).exec();
  const { star } = req.body;
  let existingRatingObject = product.reviews.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { reviews: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      { reviews: { $elemMatch: existingRatingObject } },
      {
        $set: { "reviews.$.star": star },
      },
      {
        new: true,
      }
    ).exec();
    res.json(ratingUpdated);
  }
};

const handleQuery = async (req, res, query, page, perPage) => {
  const currentPage = page || 1;
  // const perPage = 6;
  const products = await Product.find({ $text: { $search: query } })
    .skip((currentPage - 1) * perPage)
    .populate("categoryId")
    .populate("brand")
    .sort([["createdAt", "desc"]])
    .limit(perPage)
    .exec();
  res.status(200).json({ products: products });
};
const handlePaginationProduct = async (req, res, page, perPage) => {
  try {
    const currentPage = page || 1;
    // const perPage = 6;
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("categoryId")
      .populate("brand")
      .sort([["createdAt", "desc"]])
      .limit(perPage)
      .exec();
    res.status(200).json({ products });
  } catch (error) {
    console.table(error);
  }
};
exports.filterProducts = async (req, res) => {
  const { query, page, perPage } = req.body;
  if (query) {
    await handleQuery(req, res, query, page, perPage);
  } else {
    await handlePaginationProduct(req, res, page, perPage);
  }
};
