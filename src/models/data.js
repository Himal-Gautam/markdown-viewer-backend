import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    markdown: {
        type: String,
        required: true,
        trim: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: 'User'
    }
})

const Data = mongoose.model('Data', dataSchema)

export default Data