import { createMapper } from '@automapper/core'
import { classes } from '@automapper/classes'
import { logEntryProfile } from './LogEntryProfile'

export const serverMapper = createMapper({
    name: 'automapper',
    pluginInitializer: classes,
    errorHandler: {
        handle: (message) => {
            // console.log(message)
        },
    },
})

serverMapper.addProfile(logEntryProfile)
