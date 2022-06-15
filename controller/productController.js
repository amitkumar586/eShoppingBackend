const productSchema = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dlaaa',
    api_key: '773536879572886',
    api_secret: 'blNnGTmJ3uQnKS2ChLmIeVsLuks'
});

// create product - admin
exports.createProduct = (req, res, next) => {
    console.log(req.body);
    const file = req.files.productImage;

    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result);

        ///////////////////////
        const product = new productSchema({
            productImage: result.url,
            productName: req.body.productName,
            price: req.body.price,
            category: req.body.category,
        })

        product.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    success: true,
                    data: result
                })
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    error: err
                })
            })
        ///////////////////////
    })
}


// // create product
// exports.createProduct = async (req, res, next) => {
//   const product = await productSchema.create(req.body);

//   res.status(201).json({
//     success: true,
//     product,
//   });
// };


// get All products
exports.getAllProducts = async (req, res, next) => {
  try {
    // const resultPerPage = 6;
  const productCount = await productSchema.countDocuments();

  //////////////////// Api search feature start
  const apiFeature = new ApiFeatures(productSchema.find(), req.query)
      .search()
      .filter()
      // .pagination(resultPerPage);
  //////////////////// Api search feature end


  // const product = await productSchema.find();
  const product = await apiFeature.query;

  res.status(201).json({ success: true, data: product });
  
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  let product = await productSchema.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    // return res.status(500).json({
    //     success:false,
    //     message:"Product not found"
    // });
  }

  product = await productSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

// delete product
exports.deleteProduct = async (req, res, next) => {
  const product = await productSchema.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

// get single product

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await productSchema.findById(req.params.id);

    if (!product) {
      // return next(new ErrorHandler("Product not found" , 404));
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: false,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Product not found",
    });
  }
};
