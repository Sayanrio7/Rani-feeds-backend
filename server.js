const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/dbConnection");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

const productRoutes = require("./router/productRoutes");
const enquiryRoutes = require("./router/enquiryRoutes");
const galleryRoutes = require("./router/galleryRoutes");
const videoRoutes = require("./router/videoRoutes");
const aboutRoutes = require("./router/aboutRoutes");
const blogRoutes = require("./router/blogRoutes");
const categoryRoutes = require("./router/categoryRoutes");

app.use("/api/products", productRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Rani Feeds Backend is Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
