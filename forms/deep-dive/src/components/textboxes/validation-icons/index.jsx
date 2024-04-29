import { useState, useCallback } from 'react';
import {
	InputPrefix,
	TextBox
} from '@progress/kendo-react-inputs';
import { SvgIcon } from "@progress/kendo-react-common";
import {
  checkIcon,
  warningTriangleIcon,
  xIcon,
} from "@progress/kendo-svg-icons";
import { Hint } from "@progress/kendo-react-labels";
import { Ripple } from '@progress/kendo-react-ripple';

const EMPTY_VALUE = "";
const matchMinimum = (value) =>
  new RegExp(/^[a-zA-Z0-9]{1,10}$/g).test(String(value));
const matchRecommended = (value) =>
  new RegExp(/^[a-zA-Z0-9]{5,10}$/g).test(String(value));
const MAX_LENGTH = 10;

export default function TextBoxDemo() {
	const [value, setValue] = useState(EMPTY_VALUE);
	const handleChange = useCallback((event) => {
		setValue(event.target.value);
	}, []);

	const valid = matchMinimum(value);
  const recommended = matchRecommended(value);

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
					placeholder="Enter a something"
					maxLength={MAX_LENGTH}
					required={true}
					prefix={() => (
						<>
							<InputPrefix>
								{valid ? (
									recommended ? (
										<SvgIcon icon={checkIcon} themeColor="success" />
									) : (
										<SvgIcon icon={warningTriangleIcon} themeColor="warning" />
									)
								) : (
									<SvgIcon icon={xIcon} themeColor="error" />
								)}
							</InputPrefix>
						</>
					)}
				/>
				<Hint>Recommended size is between at least 5 characters</Hint>
			</div>
		</Ripple>
	);
}