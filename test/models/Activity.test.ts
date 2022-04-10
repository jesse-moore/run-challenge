import config from 'dotenv'
config.config({ path: '.env.test' })
import { expect } from 'chai'
import { Mongoose } from 'mongoose'
import { clientMapper } from '../../src/lib/automapper/clientMapper'
import dbConnect from '../../src/lib/dbConnect'
import { after } from 'mocha'
import { ActivityDto, ActivityFormDto } from '../../src/dtos/ActivityDto'
import Activity from '../../src/models/Activity'
import { Unit } from '../../src/dtos/ChallengeDto'
import { ActivityDocument } from '../../src/interfaces/mongoose.gen'

describe('Activity Model', function () {
    let db: Mongoose
    before(async () => {
        db = await dbConnect()
    })

    after(async () => {
        await db.connection.close()
    })
    it('Create Activity from ActivityFormDto', async function () {
        const activityFormDto = new ActivityFormDto()
        activityFormDto.date = '2022-02-05'
        activityFormDto.time = '15:32'
        activityFormDto.distance = 6.21
        activityFormDto.duration = 3720
        activityFormDto.timezone = 'America/Chicago'
        activityFormDto.units = Unit.Imperial
        const activityDto = clientMapper.map(activityFormDto, ActivityDto, ActivityFormDto)
        const activity = new Activity(activityDto)
        const response = await activity.save()
        console.log(response)
    })
    it('Create ActivityFormDto from Retrieved Activity', async () => {
        const activity: ActivityDocument = await Activity.findById('61ffdd92aa68019b9acd435a')
        const activityDto = activity.toJSON() as unknown as ActivityDto
        const activityFormDto = clientMapper.map(activityDto, ActivityFormDto, ActivityDto)
        console.log(activityFormDto)
    })
})
