const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../../Models/Category");
const Product = require("../../Models/Product");

exports.addCategory = async (req, res) => {
  try {
    const categoryObj = {
      title: req.body.title,
      slug: `${slugify(req.body.title)}-${shortid.generate()}`,
    };
    if (req.file) {
      categoryImgURL = process.env.API + "/public/" + req.file.filename;
      categoryObj.categoryImg = categoryImgURL;
    }
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    const category = await new Category(categoryObj);
    category.save((error, cat) => {
      if (error)
        return res.status(400).json({ error: "Already category created!" });
      else if (cat) {
        res.status(201).json({
          message: "Category create successfully",
          category: cat,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Get All Category
exports.getCategory = async (req, res, next) => {
  try {
    await Category.find({}).exec((error, categories) => {
      if (error) return res.status(400).json({ error });
      else if (categories) {
        function categoriesList(categories, parentId = null) {
          const categoryList = [];
          let category;
          if (parentId == null) {
            category = categories.filter((cat) => cat.parentId == undefined);
          } else {
            category = categories.filter((cat) => cat.parentId == parentId);
          }
          for (let cate of category) {
            categoryList.push({
              _id: cate._id,
              title: cate.title,
              slug: cate.slug,
              parentId: cate.parentId,
              categoryImg: cate.categoryImg,
              children: categoriesList(categories, cate._id),
            });
          }
          return categoryList;
        }
        const allCategories = categoriesList(categories);
        res.status(200).json({ category: allCategories });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getCategoryById = async (req, res) => {
  await Product.find({ brand: "Apple" }).exec((error, data) => {});
};
exports.updateCategory = async (req, res, next) => {
  const { _id, title, parentId } = req.body;
  const updatedCategories = [];
  if (title instanceof Array) {
    for (let i = 0; i < title.length; i++) {
      const category = {
        title: title[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(200).json({ updatedCategories });
  } else {
    const category = {
      title,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(200).json({ updatedCategory });
  }
};
exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deleteCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
    deleteCategories.push(deleteCategory);
  }
  res.status(204).json({ message: "Delete Successful", deleteCategories });
};
