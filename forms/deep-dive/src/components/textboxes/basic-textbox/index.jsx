import { useState, useCallback } from 'react';
import {
	InputClearValue,
	InputSeparator,
	TextBox
} from '@progress/kendo-react-inputs';
import { SvgIcon } from "@progress/kendo-react-common";
import { cancelIcon } from "@progress/kendo-svg-icons";
import { Ripple } from '@progress/kendo-react-ripple';
const EMPTY_VALUE = "";

export default function TextBoxDemo() {
	const [value, setValue] = useState(EMPTY_VALUE);
	const handleChange = useCallback((event) => {
		setValue(event.target.value);
	}, []);

	const handleClear = useCallback(() => {
		setValue(EMPTY_VALUE);
	}, []);

	return (
		<Ripple>
			<div
				style={{
					maxWidth: 450,
				}}>
				<div>Message:</div>
				<TextBox
					value={value}
					onChange={handleChange}
					placeholder="Enter your name"
					required={true}
					suffix={() => (
						<>
							{value !== EMPTY_VALUE && (
								<>
						  	<InputSeparator />
								<InputClearValue onClick={handleClear}>
									<SvgIcon icon={cancelIcon} />
								</InputClearValue>
								</>
							)}
						</>
					)}
				/>
			</div>
		</Ripple>
	);
}