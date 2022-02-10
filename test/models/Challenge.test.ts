import config from 'dotenv'
config.config({ path: '.env.test' })
import { expect } from 'chai'
import { Mongoose } from 'mongoose'
import { ChallengeDto, Unit } from '../../src/dtos/ChallengeDto'
import { ChallengeFormDto } from '../../src/dtos/ChallengeFormDto'
import { ChallengeDocument } from '../../src/interfaces/mongoose.gen'
import { mapper } from '../../src/lib/automapper'
import dbConnect from '../../src/lib/dbConnect'
import Challege from '../../src/models/Challenge'
import { convert } from '../../src/utils'
import example from '../data/CNFullChallenge'
import { after } from 'mocha'

describe('Challenge Model', function () {
    let db: Mongoose
    before(async () => {
        db = await dbConnect()
    })

    after(async () => {
        await db.connection.close()
    })
    it('Create Challenge from ChallengeFormDto', async function () {
        const exampleDto = mapper.map(example, ChallengeDto, ChallengeFormDto)
        const challenge: ChallengeDocument = new Challege({ ...exampleDto })
        expect(challenge.validateSync()).to.be.undefined
        await challenge.save()
    })
    it('Create ChallengeFormDto from Retrieved Challege', async function () {
        const challenge: ChallengeDocument = await Challege.findOne({ name: 'Test Challenge' })
        const challengeDto = challenge.toJSON() as unknown as ChallengeDto
        const formDto = mapper.map(challengeDto, ChallengeFormDto, ChallengeDto)
        formDto.intervals.forEach((interval) => {
            console.log(interval.requirements)
        })
        expect(1).to.equal(1)
    })
    it('Converts', async function () {
        const a = convert.mToMi(convert.miToM(6.66))
        const b = convert.mToMi(convert.miToM(5))
        const c = convert.mToFt(convert.ftToM(67.67))
        expect(6.66).to.equal(a)
        expect(5).to.equal(b)
        expect(67.67).to.equal(c)
    })
})
