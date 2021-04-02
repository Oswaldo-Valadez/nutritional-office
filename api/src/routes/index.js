const router = require("express").Router();

const authRoutes = require("./auth.routes");
const expedientsRoutes = require("./expedients.routes");

router.use(authRoutes);
router.use(expedientsRoutes);

module.exports = router;
