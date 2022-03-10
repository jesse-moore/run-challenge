import React from 'react';

interface IInputError {
	error: string;
}
export const InputError = ({ error }: IInputError) => {
	return <div className="absolute text-xs text-red-600 font-medium">{error}</div>;
};
