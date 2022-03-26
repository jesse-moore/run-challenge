import axios from 'axios'
import { axiosConfig } from '..'
import { LogEntryDto, LogEntrySeverity } from '../../dtos/LogEntryDto'

const postLog = axios.create({ ...axiosConfig, baseURL: 'api/log', method: 'POST' })

export default {
    debug: (text: string, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ text, labels, severity: LogEntrySeverity.DEBUG })
        postLog.request({ data: logEntryDto })
    },
    info: (text: string, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ text, labels, severity: LogEntrySeverity.INFO })
        postLog.request({ data: logEntryDto })
    },
    emergency: (text: string, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ text, labels, severity: LogEntrySeverity.EMERGENCY })
        postLog.request({ data: logEntryDto })
    },
    error: (text: string, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ text, labels, severity: LogEntrySeverity.ERROR })
        postLog.request({ data: logEntryDto })
    },
    notif: (text: string, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ text, labels, severity: LogEntrySeverity.NOTICE })
        postLog.request({ data: logEntryDto })
    },
    critical: (text: string, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ text, labels, severity: LogEntrySeverity.CRITICAL })
        postLog.request({ data: logEntryDto })
    },
    alert: (text: string, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ text, labels, severity: LogEntrySeverity.ALERT })
        postLog.request({ data: logEntryDto })
    },
    warning: (text: string, labels?: { [k: string]: string }) => {
        const logEntryDto = new LogEntryDto({ text, labels, severity: LogEntrySeverity.WARNING })
        postLog.request({ data: logEntryDto })
    },
}
