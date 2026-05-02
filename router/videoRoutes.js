const express = require("express");
const router = express.Router();

const VideoController = require("../controller/videoController");

router.post("/create", VideoController.create);
router.get("/get-all", VideoController.fetchAll);
router.put("/update/:id", VideoController.update);
router.delete("/delete/:id", VideoController.deleteById);

module.exports = router;