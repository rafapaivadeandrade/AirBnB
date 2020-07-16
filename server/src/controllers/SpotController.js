const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const spot = await Spot.findById(req.params.spot_id);

    return res.json(spot);
  },
  async store(req, res) {
    const { filename } = req.file;
    const { hostel, price, beds } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "Cannot find user on database" });
    }
    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      hostel,
      beds: beds.split(",").map((bed) => bed.trim()),
      price,
    });

    return res.json(spot);
  },
  async edit(req, res) {
    try {
      const { filename } = req.file;
      const { hostel, price, beds } = req.body;
      const { user_id } = req.headers;
      const { spot_id } = req.params;
      const user = await User.findById(user_id);

      if (!user) {
        return res.status(400).json({ error: "Cannot find user on database" });
      }

      const spot = await Spot.findByIdAndUpdate(
        spot_id,
        {
          user: user_id,
          thumbnail: filename,
          hostel,
          beds: beds.split(",").map((bed) => bed.trim()),
          price,
        },
        { new: true }
      );

      await spot.save();

      return res.send({ spot });
    } catch (err) {
      return res.status(400).send({ err: "Cannot update spot" });
    }
  },
};
