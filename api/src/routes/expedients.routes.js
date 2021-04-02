const router = require("express").Router();

const {
  postExpedient,
  getExpedients,
  getExpedient,
  putExpedient,
  deleteExpedient,
} = require("../controllers/expedients.controller");

router.route("/expedients").post(postExpedient).get(getExpedients);

router
  .route("/expedients/:id")
  .get(getExpedient)
  .put(putExpedient)
  .delete(deleteExpedient);

module.exports = router;
