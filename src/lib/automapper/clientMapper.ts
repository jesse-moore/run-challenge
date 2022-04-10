import { createMapper } from '@automapper/core'
import { classes } from '@automapper/classes'
import { challengeProfile } from './ChallengeProfile'
import { activityProfile } from './ActivityProfile'
import { signUpProfile } from './SignUpProfile'

export const clientMapper = createMapper({
    name: 'automapper',
    pluginInitializer: classes,
    errorHandler: {
        handle: (message) => {
            // console.log(message)
        },
    },
})

clientMapper.addProfile(challengeProfile)
clientMapper.addProfile(activityProfile)
clientMapper.addProfile(signUpProfile)
