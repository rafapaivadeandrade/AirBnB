const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    hostel: String,
    price: Number,
    beds : [String],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
},
{
    toJSON:{
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.1.68:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot',SpotSchema);