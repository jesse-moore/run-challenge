import * as Yup from 'yup'

export const emailValdiationCode = Yup.number()
    .required('Validation code is required')
    .min(100000, 'Invalid length')
    .max(999999, 'Invalid length')

export const password = Yup.string()
    .required('New password is required')
    .min(8, 'Must be at least 8 characters long')
    .matches(/[\^$*.?\-!@#%&><|_~+=]/, 'Must contain at least 1 special character (^$*.?-!@#%&><|_~+=)')
    .matches(/[A-Z]/, 'Must contain at least 1 uppercase letter')
    .matches(/[a-z]/, 'Must contain at least 1 lowercase letter')
    .matches(/[0-9]/, 'Must contain at least 1 number')

export const passwordConfirmation = Yup.string()
    .required('Password confirmation required')
    .oneOf([Yup.ref('password'), null], 'New passwords must match')

export const yearMonthDay = {
    year: Yup.number()
        .typeError('Required')
        .min(1900, 'Invalid Year')
        .max(new Date().getFullYear(), 'Invalid Year')
        .required('Required')
        .integer(),
    month: Yup.number().typeError('Required').min(1, 'Invalid Month').max(12, 'Invalid Month').required('Required'),
    day: Yup.number()
        .typeError('Required')
        .required('Required')
        .min(1, 'Invalid Day')
        .test('day', 'Invalid Day', (day, props) => {
            const { month, year } = props.parent
            const yearIsValid = year > 1899 && year <= new Date().getFullYear()
            const monthIsValid = month > 0 && month < 13
            if (yearIsValid && monthIsValid) {
                return day <= new Date(year, month, 0).getDate()
            } else {
                return day < 32
            }
        })
        .integer('Invalid Day'),
}
