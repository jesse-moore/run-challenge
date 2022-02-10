import mongoose from 'mongoose'
import { ActivityModel, ActivityDocument, ActivitySchema } from '../interfaces/mongoose.gen'

const ActivitySchema: ActivitySchema = new mongoose.Schema({
    distance: {
        type: Number,
        required: [true, 'Distance is required.'],
    },
    elapsedTime: {
        type: Number,
        required: [true, 'Elapsed Time is required.'],
    },
    elevationGain: {
        type: Number,
    },
    movingTime: {
        type: Number,
    },
    date: {
        type: String,
        required: [true, 'Date is required.'],
    },
    localDate: {
        type: String,
        required: [true, 'Local Date is required.'],
    },
    timezone: {
        type: String,
        required: [true, 'Time Zone is required.'],
    },
    offset: {
        type: Number,
        required: [true, 'Offset is required.'],
    },
})

ActivitySchema.set('toJSON', {
    transform: (_document: any, returnedObject: { id: any; _id: any; __v: any }) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

export default mongoose.models.Activity || mongoose.model<ActivityDocument, ActivityModel>('Activity', ActivitySchema)
