import React, { ReactNode } from 'react';

export const InputWrapper = ({ children }: { children: ReactNode; }) => {
	return <div className="relative mb-4 mt-2">{children}</div>;
};
