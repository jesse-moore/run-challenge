import mongoose from 'mongoose'

const ChallengeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this challenge.'],
        maxlength: [20, 'Name cannot be more than 60 characters'],
    },
    start: {
        type: String,
        required: [true, 'Please provide a start date.'],
    },
    end: {
        type: String,
        required: [true, 'Please provide a end date.'],
    },
})

export default mongoose.models.Challenge ||
    mongoose.model('Challenge', ChallengeSchema)
