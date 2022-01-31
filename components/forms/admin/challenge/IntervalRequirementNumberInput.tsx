import { useField } from 'formik';

interface IIntervalRequirementNumberInput {
	name: string;
	min?: string;
	max?: string;
	unit?: string;
}

export const IntervalRequirementNumberInput = ({ name, unit, ...props }: IIntervalRequirementNumberInput) => {
	const [field] = useField(name);

	return (
		<label className="flex gap-1 items-end">
			<input
				{...field}
				{...props}
				className="border w-24 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				type="number" />
			<span>{unit}</span>
		</label>
	);
};
