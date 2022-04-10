import { AutoMap } from '@automapper/classes'

// 'EMERGENCY' | 'ALERT' | 'CRITICAL' | 'ERROR' | 'WARNING' | 'NOTICE' | 'INFO' | 'DEBUG'
export enum LogEntrySeverity {
    EMERGENCY = 'EMERGENCY',
    ALERT = 'ALERT',
    CRITICAL = 'CRITICAL',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    NOTICE = 'NOTICE',
    INFO = 'INFO',
    DEBUG = 'DEBUG',
}

export type LogData = string | { [k: string]: string }

export class LogEntryDto {
    @AutoMap()
    data: LogData
    @AutoMap()
    severity: keyof typeof LogEntrySeverity
    @AutoMap()
    labels: { [k: string]: string }
    constructor(body?: any) {
        if (!body) return
        this.data = body.data
        this.severity = typeof body.severity === 'string' ? body.severity.toUpperCase() : ''
        this.labels = { env: process.env.NODE_ENV, ...body.labels }
    }

    validate(): string | void {
        try {
            if (!this.data) throw new Error('Data field required')
            if (typeof this.data === 'string') {
                if (this.data.length > 255) throw new Error('Data field length exceeded')
            } else {
                try {
                    const dataString = JSON.stringify(this.data)
                    if (dataString.length > 255) throw new Error('Data field length exceeded')
                } catch (error) {
                    throw new Error('Invalid data type')
                }
            }
            if (!this.severity) throw new Error('Severity field required')
            if (!(this.severity in LogEntrySeverity)) throw Error('Invalid severity type')
            if (this.labels) {
                Object.entries(this.labels).forEach(([key, value]) => {
                    if (key.length > 25) throw new Error('Label key length exceeded')
                    if (typeof value !== 'string') throw new Error('Label value must be a string')
                    if (value.length > 25) throw new Error('Label value length exceeded')
                })
            }
        } catch (error) {
            return error.message
        }
    }
}
