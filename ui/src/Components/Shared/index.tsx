import { createSignal } from "solid-js";
import { InputType } from "../../../Types";

type TextFieldType = {
	label: string;
	inputType: InputType;
	rounded?: boolean;
	classnames?: string;
	togglePassword?: any
};

export const TextField = (props: TextFieldType) => {
	const [value, setValue] = createSignal('');
	const { label, rounded, classnames, togglePassword } = props

	return <div class={`flex flex-row justify-between items-center px-2 ${rounded ? 'rounded-full' : 'rounded-lg'} w-11/12 md:w-7/12 bg-[#F6F6F6] text-black placeholder:font-light placeholder:text-[#BDBDBD] ${classnames}`}>
		<input
			value={value()}
			onChange={(e) => {
				setValue(e.target.value)
			}}
			class='bg-transparent w-full border-transparent focus:border-transparent focus:ring-0'
			placeholder={label}
			type={props.inputType as string}
		/>
		{label === 'Password' && <p class="hover:text-orange-300" onMouseDown={() => togglePassword()}>{props.inputType === 'text' ? 'Hide' : 'Show'}</p>}
	</div>
};

type ButtonType = {
	align?: 'center'
	text: string
}
export const Button = ({ text, align }: ButtonType) => {

	return <div
		class='w-7/12 md:w-1/3 bg-[#306BC3] text-white rounded-full p-3'
		style={{ "align-self": 'center' }}
	>
		<p class='text-center'>{text}</p>
	</div>
}