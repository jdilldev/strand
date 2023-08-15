import { createSignal } from "solid-js";
import { InputType, ThreadBrandType } from "../../../Types";

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

<input type="radio" name="radio" value="1" class="h-4 w-4 checked:bg-green-500 text-green-500" />


type RadioGroupType = {
	options: { name: string, value: string }[]
	control: any;
	name: string
	onChangeAction: (e: ThreadBrandType) => void
}

export const RadioGroup = ({ options, name, onChangeAction, control }: RadioGroupType) => <div class="flex flex-col gap-2">
	<p class='capitalize'>{name}</p>
	{options.map((option: { name: string, value: string }) =>
		<div class='flex flex-row gap-2'>
			<input type="radio" checked={option.value === control} name={name} value={option.value} class="h-4 w-4 checked:bg-green-500 text-green-500" onClick={() => onChangeAction(option.value as ThreadBrandType)} />
			<p>{option.name}</p>
		</div>
	)}
</div>


type ButtonType = {
	align?: 'center'
	text: string
	onPress: () => void
}
export const Button = (props: ButtonType) => {
	const { onPress } = props

	return <button onClick={() => onPress()} class='capitalize w-7/12 md:w-1/3 bg-[#306BC3] text-white rounded-full p-3 hover:opacity-80'> {props.text}</button>

}