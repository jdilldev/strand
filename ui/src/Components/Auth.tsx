import { TextField } from "./Shared"
import StrandLogo from '../logo.svg'
import { createSignal } from "solid-js";
import { InputType } from "../../Types";

export const Auth = () => {
    const [authType, setAuthType] = createSignal<'sign up' | 'login'>('login')
    const [passwordInputType, setPasswordInputType] = createSignal<InputType>('password')

    const togglePassword = () => setPasswordInputType(v => v === 'text' ? 'password' : 'text')

    return <div class='flex flex-col gap-8 justify-center items-center align-center'>
        <img class='self-center' src={StrandLogo} alt="Strand Logo" />
        <article class='prose lg:prose-xl'>
            <h2 class='text-center'>{authType() === 'sign up' ? 'Sign Up' : 'Log in'}</h2>
        </article>

        <div class='w-screen flex flex-col gap-3 justify-center items-center'>
            {authType() === 'sign up' && <TextField label='Name' inputType={'text'} />}
            <TextField label='Email' inputType={'email'} />
            <TextField label='Password' inputType={passwordInputType()} togglePassword={togglePassword} />
        </div>
        {authType() === 'sign up' && <div class='flex flex-row px-8 gap-3 self-center items-center'>
            <input type="checkbox" class="appearance-none rounded-sm border-gray-300 border-2 checked:bg-blue-500 focus:ring-0" />
            <p>I would like to receive your newsletter and other promotional information.</p>
        </div>}
        <button class='w-7/12 md:w-1/3 bg-[#306BC3] text-white rounded-full p-3 hover:opacity-80'> {authType() === 'sign up' ? 'Sign Up' : 'Log in'}</button>
        {authType() === 'login' && <p class='text-blue-950 hover:opacity-70'>Forgot password?</p>}
        <p onClick={() => authType() === 'login' ? setAuthType('sign up') : setAuthType('login')}>Already have a Strand account? <span class='text-blue-700 hover:opacity-70' >{authType() === 'sign up' ? 'Log in' : 'Sign up'} </span></p>
    </div>
}