import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { NumberSchema } from 'yup'
dayjs.extend(duration)

export const convert = {
    kmToMi: (km: number): number => {
        return km * 0.621
    },
    kmToM: (m: number): number => {
        return m * 1000
    },
    miToKm: (mi: number): number => {
        return mi * 1.60934
    },
    miToM: (mi: number): number => {
        return Math.round(mi * 1609.34)
    },
    mToMi: (m: number): number => {
        const a = Math.round(m * 0.621371) * 0.001
        return Number(a.toFixed(2))
    },
    mToFt: (m: number): number => {
        const a = Math.round(m * 3280.84) * 0.001
        return Number(a.toFixed(2))
    },
    mToKm: (m: number): number => {
        const a = m * 0.001
        return Number(a.toFixed(2))
    },
    ftToM: (ft: number): number => {
        return Math.round(ft * 304.8) / 1000
    },
    toTimeObject: (_seconds: number): { hours: number; minutes: number; seconds: number } => {
        let timeRemaining = _seconds
        const hours = Math.floor(_seconds / 3600)
        timeRemaining -= hours * 3600
        const minutes = Math.floor(timeRemaining / 60)
        timeRemaining -= minutes * 60
        const seconds = timeRemaining
        return { hours, minutes, seconds }
    },
    toSeconds: (timeObject: { hours: number; minutes: number; seconds: number }): number => {
        const { hours, minutes, seconds } = timeObject
        return hours * 3600 + minutes * 60 + seconds
    },
}

export const date = {
    addDay: (date: string, days: number) => {
        return dayjs(date).add(days, 'day').format('YYYY-MM-DDTHH:mm:ss')
    },
}
