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

export class LogEntryDto {
    @AutoMap()
    text: string
    @AutoMap()
    severity: keyof typeof LogEntrySeverity
    @AutoMap()
    labels: { [k: string]: string }
    constructor(body?: any) {
        if (!body) return
        this.text = body.text
        this.severity = typeof body.severity === 'string' ? body.severity.toUpperCase() : ''
        this.labels = { env: process.env.NODE_ENV, ...body.labels }
    }

    validate(): string | void {
        try {
            if (!this.text) throw new Error('Text field required')
            if (typeof this.text !== 'string') throw new Error('Invalid text field')
            if (this.text.length > 255) throw new Error('Text field length exceeded')
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
