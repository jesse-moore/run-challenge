import { Entry, Logging } from '@google-cloud/logging'
import { LogEntry } from '@google-cloud/logging/build/src/entry'
import { LogEntrySeverity } from '../../dtos/LogEntryDto'

const projectId = process.env.GCLOUD_LOGGER_PROJECT_NAME
const logName = process.env.GCLOUD_LOGGER_LOG_NAME
if (!projectId || !logName) throw new Error('Invalid logger config')
const logger = new Logging({ projectId, keyFilename: 'gcloud_key.json' }).log(logName)

const writeLog = (text: string, labels: { [k: string]: string } = {}, severity: LogEntrySeverity) => {
    const metadata: LogEntry = {
        resource: { type: 'global' },
        labels: { env: process.env.NODE_ENV, ...labels },
        severity: String(severity),
    }
    logger.write(new Entry(metadata, text))
}

export default {
    debug: (text: string, labels?: { [k: string]: string }) => {
        writeLog(text, labels, LogEntrySeverity.DEBUG)
    },
    info: (text: string, labels?: { [k: string]: string }) => {
        writeLog(text, labels, LogEntrySeverity.INFO)
    },
    emergency: (text: string, labels?: { [k: string]: string }) => {
        writeLog(text, labels, LogEntrySeverity.EMERGENCY)
    },
    error: (text: string, labels?: { [k: string]: string }) => {
        writeLog(text, labels, LogEntrySeverity.ERROR)
    },
    notif: (text: string, labels?: { [k: string]: string }) => {
        writeLog(text, labels, LogEntrySeverity.NOTICE)
    },
    critical: (text: string, labels?: { [k: string]: string }) => {
        writeLog(text, labels, LogEntrySeverity.CRITICAL)
    },
    alert: (text: string, labels?: { [k: string]: string }) => {
        writeLog(text, labels, LogEntrySeverity.ALERT)
    },
    warning: (text: string, labels?: { [k: string]: string }) => {
        writeLog(text, labels, LogEntrySeverity.WARNING)
    },
    write: (entry: Entry) => logger.write(entry),
}
