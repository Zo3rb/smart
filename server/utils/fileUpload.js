const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AppError = require("./AppError");

// Ensure upload directories exist
const createDirectories = () => {
  const dirs = [
    path.join(__dirname, "../uploads"),
    path.join(__dirname, "../uploads/profiles"),
    path.join(__dirname, "../uploads/documents"),
    path.join(__dirname, "../uploads/images"),
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Call once when module is loaded
createDirectories();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine destination folder based on file type or req.uploadType
    let uploadPath = path.join(__dirname, "../uploads");

    if (req.uploadType) {
      switch (req.uploadType) {
        case "profile":
          uploadPath = path.join(__dirname, "../uploads/profiles");
          break;
        case "document":
          uploadPath = path.join(__dirname, "../uploads/documents");
          break;
        case "image":
          uploadPath = path.join(__dirname, "../uploads/images");
          break;
      }
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// Configure file filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedMimes = {
    image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    document: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ],
    profile: ["image/jpeg", "image/png"],
  };

  // Check against specific allowed types if uploadType is specified
  if (req.uploadType && allowedMimes[req.uploadType]) {
    if (allowedMimes[req.uploadType].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          `Invalid file type. Allowed types for ${
            req.uploadType
          }: ${allowedMimes[req.uploadType].join(", ")}`,
          400
        ),
        false
      );
    }
  } else {
    // Default to general image types
    const allowed = [...allowedMimes.image, ...allowedMimes.document];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Invalid file type", 400), false);
    }
  }
};

// Configure upload options
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Helper to set upload type
const setUploadType = (type) => (req, res, next) => {
  req.uploadType = type;
  next();
};

// Helper to get file path
const getFilePath = (folder, filename) => {
  return path.join(__dirname, `../uploads/${folder}/${filename}`);
};

// Helper to check if file exists
const fileExists = (folder, filename) => {
  const filePath = getFilePath(folder, filename);
  return fs.existsSync(filePath);
};

// Helper to delete file
const deleteFile = (folder, filename) => {
  const filePath = getFilePath(folder, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
};

// Helper to serve a file
const serveFile = (folder, filename, res, next) => {
  const filePath = getFilePath(folder, filename);
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  } else {
    return next(new AppError("File not found", 404));
  }
};

// Get the default profile image path
const getDefaultProfileImagePath = () => {
  return path.join(__dirname, "../uploads/profiles/default-profile.png");
};

module.exports = {
  upload,
  setUploadType,
  getFilePath,
  fileExists,
  deleteFile,
  serveFile,
  getDefaultProfileImagePath,
};
