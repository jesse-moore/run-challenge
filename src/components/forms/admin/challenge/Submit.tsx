import { useFormikContext } from 'formik';

export const Submit = () => {
	const { isValid, errors } = useFormikContext();
	return (
		<button
			className="
			w-full
			rounded-md
			bg-indigo-600
			border
			border-primary
			py-3
			px-5
			bg-primary
			text-base text-white
			cursor-pointer
			hover:bg-opacity-90
			transition
			"
			type="submit"
		>
			Submit
		</button>
	);
};
