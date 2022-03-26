import { Entry } from '@google-cloud/logging'
import type { NextApiRequest, NextApiResponse } from 'next'
import { LogEntryDto } from '../../dtos/LogEntryDto'
import { mapper } from '../../lib/automapper'
import logger from '../../services/logger'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const entryDto = new LogEntryDto(req.body)
			console.log(entryDto)
            const error = entryDto.validate()
            if (error) {
                res.status(400).send(error)
            } else {
                const entry = mapper.map(entryDto, Entry, LogEntryDto)
                logger.write(entry)
                res.status(200).json(entry.toJSON())
            }
        } catch (error) {
            res.status(400).end()
        }
    } else {
        res.status(405).end()
    }
}
