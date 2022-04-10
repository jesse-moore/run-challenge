import { Formik } from 'formik'
import * as Yup from 'yup'
import { ChallengeFormDto } from '../../../../dtos/ChallengeFormDto'
import { ChallengeForm as Form } from './ChallengeForm'
import { clientMapper } from '../../../../lib/automapper/clientMapper'
import { ChallengeDto } from '../../../../dtos/ChallengeDto'

interface IChallengeForm {
    initialValues?: ChallengeFormDto
}

export const ChallengeForm = ({ initialValues = new ChallengeFormDto() }: IChallengeForm) => {
    const validationSchema = Yup.object({
        name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        start: Yup.date().required('Required'),
        end: Yup.date()
            .required('This field is required.')
            .when(['start'], (start: Date, schema) => {
                if (!start) return
                const date = start.toISOString().split('T')[0]
                return schema.min(start, `Date must be on or after ${date}`)
            }),
        type: Yup.string().required('Required'),
        intervalType: Yup.string().when(['type'], {
            is: 'interval',
            then: Yup.string().required('This field is required.'),
            otherwise: Yup.string(),
        }),
    })

    const onSubmit = (values, { setTouched, setSubmitting }) => {
        setTimeout(() => {
            // alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }

    const test = () => {
        const test = clientMapper.map(initialValues, ChallengeDto, ChallengeFormDto)
        console.log(test)
    }

    return (
        <Formik<ChallengeFormDto> {...{ initialValues, validationSchema }} onSubmit={onSubmit}>
            <button onClick={() => test()}>SUBMIT</button>
            {/* <Form /> */}
        </Formik>
    )
}
