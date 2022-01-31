import { createMapper } from '@automapper/core'
import { classes } from '@automapper/classes'
import { challengeProfile } from './ChallengeProfile'

export const mapper = createMapper({
    name: 'automapper',
    pluginInitializer: classes,
    errorHandler: {
        handle: (message) => {
            console.log(message)
        },
    },
})

mapper.addProfile(challengeProfile)
