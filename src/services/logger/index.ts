import { Entry, Logging } from '@google-cloud/logging'
import { LogEntry } from '@google-cloud/logging/build/src/entry'
import { LogEntrySeverity } from '../../dtos/LogEntryDto'

const projectId = process.env.GCLOUD_LOGGER_PROJECT_NAME
const logName = process.env.GCLOUD_LOGGER_LOG_NAME
if (!projectId || !logName) throw new Error('Invalid logger config')
const logger = new Logging({ projectId, keyFilename: 'gcloud_key.json' }).log(logName)

const writeLog = (data: LogData, labels: { [k: string]: string } = {}, severity: LogEntrySeverity) => {
    const metadata: LogEntry = {
        resource: { type: 'global' },
        labels: { env: process.env.NODE_ENV, ...labels },
        severity: String(severity),
    }

    logger.write(new Entry(metadata, data))
}

type LogData = string | { [k: string]: string }

export default {
    debug: (data: LogData, labels?: { [k: string]: string }) => {
        writeLog(data, labels, LogEntrySeverity.DEBUG)
    },
    info: (data: LogData, labels?: { [k: string]: string }) => {
        writeLog(data, labels, LogEntrySeverity.INFO)
    },
    emergency: (data: LogData, labels?: { [k: string]: string }) => {
        writeLog(data, labels, LogEntrySeverity.EMERGENCY)
    },
    error: (data: LogData, labels?: { [k: string]: string }) => {
        writeLog(data, labels, LogEntrySeverity.ERROR)
    },
    notif: (data: LogData, labels?: { [k: string]: string }) => {
        writeLog(data, labels, LogEntrySeverity.NOTICE)
    },
    critical: (data: LogData, labels?: { [k: string]: string }) => {
        writeLog(data, labels, LogEntrySeverity.CRITICAL)
    },
    alert: (data: LogData, labels?: { [k: string]: string }) => {
        writeLog(data, labels, LogEntrySeverity.ALERT)
    },
    warning: (data: LogData, labels?: { [k: string]: string }) => {
        writeLog(data, labels, LogEntrySeverity.WARNING)
    },
    write: (entry: Entry) => logger.write(entry),
}
