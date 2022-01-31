import { useState } from 'react';
import { useField } from 'formik';

interface IIntervalRequirementDurationInput {
	name: string;
}

export const IntervalRequirementDurationInput = ({ name, ...props }: IIntervalRequirementDurationInput) => {
	const [field, meta, helpers] = useField(name);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);

	const handelBlurHours = () => {
		if (hours > 23 && minutes > 0) {
			setHours(23);
		} else if (hours > 24) {
			setHours(24);
		}
		setDuration();
	};

	const handelBlurMinutes = () => {
		if (hours === 24) {
			setMinutes(0);
		} else if (minutes > 59) {
			setMinutes(59);
		}
		setDuration();
	};

	const setDuration = () => {
		const duration = hours * 3600 + minutes * 60;
		helpers.setValue(duration);
	};

	return (
		<>
			<label className="flex flex-row items-end gap-1">
				<input
					className="border w-12 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					type="number"
					min="0"
					max="24"
					name={`${name}-hours`}
					value={hours}
					onChange={({ target }) => setHours(Number(target.value))}
					onBlur={handelBlurHours} />
				Hours
			</label>
			<label className="flex flex-row items-end gap-1">
				<input
					className="border w-12 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					type="number"
					min="0"
					max="60"
					name={`${name}-minutes`}
					value={minutes}
					onChange={({ target }) => setMinutes(Number(target.value))}
					onBlur={handelBlurMinutes} />
				Minutes
			</label>
		</>
	);
};
