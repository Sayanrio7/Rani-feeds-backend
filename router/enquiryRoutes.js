const express = require("express");
const router = express.Router();

const EnquiryController = require("../controller/enquiryController");

router.post("/create", EnquiryController.create);
router.get("/get-all", EnquiryController.fetchAll);
router.put("/update-status/:id", EnquiryController.updateStatus);
router.delete("/delete/:id", EnquiryController.deleteById);

module.exports = router;