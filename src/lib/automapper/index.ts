import { createMapper } from '@automapper/core'
import { classes } from '@automapper/classes'
import { challengeProfile } from './ChallengeProfile'
import { activityProfile } from './ActivityProfile'
import { signUpProfile } from './SignUpProfile'
import { logEntryProfile } from './LogEntryProfile'

export const mapper = createMapper({
    name: 'automapper',
    pluginInitializer: classes,
    errorHandler: {
        handle: (message) => {
            // console.log(message)
        },
    },
})

mapper.addProfile(challengeProfile)
mapper.addProfile(activityProfile)
mapper.addProfile(signUpProfile)
mapper.addProfile(logEntryProfile)
