import { useState, useCallback } from 'react';
import {
	InputPrefix,
	InputSuffix,
	InputSeparator,
	TextBox
} from '@progress/kendo-react-inputs';
import { SvgIcon } from "@progress/kendo-react-common";
import { 
	dataIcon,
	searchIcon 
} from "@progress/kendo-svg-icons";
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';
const EMPTY_VALUE = "";

export default function TextBoxDemo() {
	const [searchValue, setSearchValue] = useState("");
	const [value, setValue] = useState(EMPTY_VALUE);
	const handleChange = useCallback((event) => {
		setValue(event.target.value);
	}, []);

	const handleSearchValueChange = useCallback((event) => {
		setSearchValue(event.target.value);
	}, []);

	return (
		<Ripple>
			<div>A Prefix icon/button:</div>
			<div
				style={{
					maxWidth: 450,
				}}>
				<TextBox
					value={value}
					onChange={handleChange}
					placeholder="Select a data source."
					required={true}
					prefix={() => (
						<InputPrefix>
							<Button fillMode={"flat"} svgIcon={dataIcon} />
						</InputPrefix>
					)}
				/>
			</div><br />
			<div>A Suffix icon/button:</div>
			<div
				style={{
					maxWidth: 450,
				}}
			>
				<TextBox
					value={searchValue}
					onChange={handleSearchValueChange}
					placeholder="Enter a keyword to begin searching..."
					required={true}
					suffix={() => (
						<>
							<InputSuffix>
            		<Button
									disabled={searchValue === EMPTY_VALUE}
									themeColor="primary"
									fillMode={"flat"}
									rounded={null}
									svgIcon={searchIcon}
            		/>
          		</InputSuffix>
						</>
					)}
				/>
			</div>
		</Ripple>
	);
}