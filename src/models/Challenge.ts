import mongoose from 'mongoose'
import { ChallengeDocument, ChallengeModel, ChallengeSchema, ChallengeInterval } from '../interfaces/mongoose.gen'
import { ChallengeType, IntervalType, RequirementType, ScoringMetric } from '../dtos/ChallengeDto'

const ChallengeIntervalSchema = new mongoose.Schema<ChallengeInterval>(
    {
        start: {
            type: String,
            required: [true, 'Please provide a start date.'],
        },
        end: {
            type: String,
            required: [true, 'Please provide a end date.'],
        },
        scoringMetric: {
            type: String,
            required: [true, 'Scoring Metric required'],
            enum: ScoringMetric,
        },
        requirements: {
            type: Map,
            of: String,
        },
    },
    { _id: false }
)

const ChallengeSchema: ChallengeSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: [true, 'Challege Type is required'],
        enum: ChallengeType,
    },
    intervalType: {
        type: String,
        required: [true, 'Challege Interval Type is required'],
        enum: IntervalType,
    },
    intervals: [ChallengeIntervalSchema],
})

ChallengeSchema.set('toJSON', {
    transform: (_document: any, returnedObject: { id: any; _id: any; __v: any }) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

export default mongoose.models.Challenge ||
    mongoose.model<ChallengeDocument, ChallengeModel>('Challenge', ChallengeSchema)
