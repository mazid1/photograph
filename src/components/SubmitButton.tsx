"use client";
import type React from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({
	children,
	...rest
}: React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) {
	const { pending } = useFormStatus();

	return (
		<button {...rest} disabled={pending}>
			{pending && <span className="loading loading-spinner" />}
			{children}
		</button>
	);
}

export default SubmitButton;
