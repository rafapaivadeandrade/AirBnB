const Spots = require("../models/Spot");

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;
    const spots = await Spots.find({ user: user_id });
    return res.json(spots);
  },
  async destroy(req, res) {
    try {
      const spot = await Spots.findByIdAndDelete(req.params.spot_id);

      return res.send();
    } catch (err) {
      return res
        .status(400)
        .send({ error: "There was a problem trying to delete spot" });
    }
  },
};
