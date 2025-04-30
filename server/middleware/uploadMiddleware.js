const { upload, setUploadType } = require("../utils/fileUpload");
const AppError = require("../utils/AppError");

// Single file upload middleware with type specification
const uploadSingle = (fieldName, type = null) => {
  return [
    type ? setUploadType(type) : (req, res, next) => next(),
    (req, res, next) => {
      upload.single(fieldName)(req, res, (err) => {
        if (err) {
          return next(new AppError(err.message || "Error uploading file", 400));
        }
        next();
      });
    },
  ];
};

// Multiple files upload middleware with type specification
const uploadMultiple = (fieldName, maxCount = 5, type = null) => {
  return [
    type ? setUploadType(type) : (req, res, next) => next(),
    (req, res, next) => {
      upload.array(fieldName, maxCount)(req, res, (err) => {
        if (err) {
          return next(
            new AppError(err.message || "Error uploading files", 400)
          );
        }
        next();
      });
    },
  ];
};

// Fields upload middleware with type specification
const uploadFields = (fields, type = null) => {
  return [
    type ? setUploadType(type) : (req, res, next) => next(),
    (req, res, next) => {
      upload.fields(fields)(req, res, (err) => {
        if (err) {
          return next(
            new AppError(err.message || "Error uploading files", 400)
          );
        }
        next();
      });
    },
  ];
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadFields,
};
