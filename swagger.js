// swagger.js

const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Rani Feeds API",
      version: "1.0.0",
      description: "API Documentation for Rani Feeds Backend",
      contact: {
        name: "Rani Feeds",
      },
    },

    servers: [
      {
        url: "https://rani-feeds-backend.onrender.com",
        description: "Production Server",
      },
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],
    tags: [
      {
        name: "Products",
        description: "Product Management APIs",
      },
      {
        name: "Categories",
        description: "Category Management APIs",
      },
      {
        name: "Gallery",
        description: "Gallery Management APIs",
      },
      {
        name: "Blogs",
        description: "Blog Management APIs",
      },
      {
        name: "Videos",
        description: "Video Management APIs",
      },
      {
        name: "About",
        description: "About Page APIs",
      },
      {
        name: "Enquiries",
        description: "Customer Enquiry APIs",
      },
    ],
  },

  apis: ["./router/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
