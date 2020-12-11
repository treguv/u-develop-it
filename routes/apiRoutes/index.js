const express = require("express");
const router = express.Router();

router.use(require("./candidateRoutes")); // candidate routes
router.use(require("./partyRoutes"));
router.use(require("./votersRoutes"));
module.exports = router;
