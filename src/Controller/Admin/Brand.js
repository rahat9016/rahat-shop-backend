const slugify = require("slugify");
const shortid = require("shortid");
const Brand = require("../../Models/Brand");

exports.brandCreate = async (req, res) => {
  try {
    let brandCover = [];
    let brandObj = {
      name: req.body.name,
      slug: `${slugify(req.body.name)}-${shortid.generate()}`,
      description: req.body.description,
      createBy: req.user._id,
    };

    if (req.files.brandLogo) {
      req.files.brandLogo.map((file) => {
        if (file) {
          const brandLogo = process.env.API + "/public/" + file.filename;
          brandObj.brandLogo = brandLogo;
        }
      });
    }
    if (req.files.brandCover) {
      req.files.brandCover.map((cover) => {
        brandCover.push({ img: process.env.API + "/public/" + cover.filename });
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
