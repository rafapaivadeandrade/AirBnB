const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports  ={
    async index (req,res){
        const{bed} = req.query;

        const spots = await Spot.find({beds : bed});

        return res.json(spots)
    },
    async store(req,res){
        
        const{ filename } = req.file;
        const { hostel,price, beds} = req.body;
        const{user_id} = req.headers;

        const user = await User.findById(user_id);


        if(!user){
            return res.status(400).json({error:"Cannot find user on database"})
        }
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            hostel,
            beds: beds.split(',').map(bed => bed.trim()),
            price
        })
        
        return res.json(spot);
    }
}