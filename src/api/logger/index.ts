import axios from 'axios'
import { axiosConfig } from '..'
import { LogData, LogEntryDto, LogEntrySeverity } from '../../dtos/LogEntryDto'

const postLog = axios.create({ ...axiosConfig, baseURL: 'api/log', method: 'POST' })

export default {
    debug: (data: LogData, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ data, labels, severity: LogEntrySeverity.DEBUG })
        postLog.request({ data: logEntryDto })
    },
    info: (data: LogData, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ data, labels, severity: LogEntrySeverity.INFO })
        postLog.request({ data: logEntryDto })
    },
    emergency: (data: LogData, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ data, labels, severity: LogEntrySeverity.EMERGENCY })
        postLog.request({ data: logEntryDto })
    },
    error: (data: LogData, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ data, labels, severity: LogEntrySeverity.ERROR })
        postLog.request({ data: logEntryDto })
    },
    notif: (data: LogData, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ data, labels, severity: LogEntrySeverity.NOTICE })
        postLog.request({ data: logEntryDto })
    },
    critical: (data: LogData, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ data, labels, severity: LogEntrySeverity.CRITICAL })
        postLog.request({ data: logEntryDto })
    },
    alert: (data: LogData, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ data, labels, severity: LogEntrySeverity.ALERT })
        postLog.request({ data: logEntryDto })
    },
    warning: (data: LogData, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ data, labels, severity: LogEntrySeverity.WARNING })
        postLog.request({ data: logEntryDto })
    },
}
