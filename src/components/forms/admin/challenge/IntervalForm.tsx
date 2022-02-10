import { useFormikContext } from "formik";
import { ChallengeFormDto } from "../../../../dtos/ChallengeFormDto";
import { CustomIntervalForm } from "./CustomIntervalForm";

export const IntervalForm = () => {
	const { values } = useFormikContext<ChallengeFormDto>()
	return (
		<>
			{/* <CustomRadio
                label="Interval Type"
                name="intervalType"
                radios={[
                    { label: 'Daily', value: 'daily' },
                    {
                        label: 'Weekly',
                        value: 'weekly',
                        disabled: true,
                    },
                ]}
            /> */}
			{values.start && values.end && <CustomIntervalForm />}
		</>
	);
};
