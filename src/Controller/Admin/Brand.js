const slugify = require("slugify");
const shortid = require("shortid");
const Brand = require("../../Models/Brand");

exports.brandCreate = async (req, res) => {
  const { values, brandLogo, brandCover } = req.body;
  try {
    let brandCovers = [];
    let brandObj = {
      name: values.name,
      slug: `${slugify(values.name)}-${shortid.generate()}`,
      description: values.description,
      createBy: req.user._id,
    };
    if (brandLogo) {
      brandObj.brandLogo = brandLogo.url;
    }
    if (brandCover) {
      brandCover.map((cover) => {
        brandCovers.push({ img: cover.url, public_id: cover.public_id });
      });
    }
    const brand = await new Brand({ ...brandObj, brandCover });
    brand.save((error, data) => {
      if (data) {
        res.status(201).json({
          message: "Brand created!",
        });
      } else {
        if (error.keyPattern.name > 0) {
          res.status(400).json({
            message: "Already brand created!",
          });
        }
      }
    });
  } catch (error) {
    console.log("Brand Error ----->", error);
  }
};
exports.getAllBrand = async (req, res) => {
  await Brand.find({}).exec((error, brands) => {
    if (brands) {
      res.status(200).json({
        brands,
      });
    }
  });
};
