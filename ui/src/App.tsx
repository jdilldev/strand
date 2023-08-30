import { type Component } from 'solid-js';
import StrandLogo from './logo.svg'
import "./index.css";
import { ColorSwatch, ColorSwatchContainer } from './Components/ColorSwatch';
import { Button, TextField } from './Components/Shared';
import { Route, Routes } from '@solidjs/router';
import { Auth } from './Components/Auth';
import { RouteGuard } from './Components/RouteGuard';
import { Dashboard } from './Components/Dashboard';


const App: Component = () => (
  <Routes>
    <Route path="/strand/auth" component={Auth} />
    <Route path="/" component={Dashboard}>
      <Route path="/strand/home" component={Dashboard} />
    </Route>
    <Route path="*" component={() => <div>Page Not found!!!</div>} />
  </Routes>
);

export default App;

/**
 * <div class='flex flex-col'>
    <img class='self-center' src={StrandLogo} alt="Strand Logo" />

  </div>
 */

/**
 *         <article class='prose lg:prose-xl'>
          <h2 class='text-center'>Sign Up</h2>
        </article>
        <div class='w-screen flex flex-col gap-3 justify-center items-center'>
          <TextField label='Name' inputType={'text'} />
          <TextField label='Email' inputType={'email'} />
          <TextField label='Password' inputType={'password'} />
        </div>
        <div class='flex flex-row px-8 gap-3 self-center items-center'>
          <input type="checkbox" class="appearance-none rounded-sm border-gray-300 border-2 checked:bg-blue-500 focus:ring-0" />
          <p>I would like to receive your newsletter and other promotional information.</p>
        </div>
        <Button />
        <p class='text-blue-950'>Forgot password?</p>
        <p class='text-blue-700'>Already have a Strand account? <a href='https://www.google.com'>Log in</a></p>
 */

/**
 *         <h2 class='text-center'>Log In</h2>
<div class='w-screen flex flex-col gap-3 justify-center items-center'>
  <TextField label='Email' inputType={'email'} />
  <TextField label='Password' inputType={'password'} />
</div>
<Button />
<p class='text-blue-950'>Forgot password?</p>
<p>Don't have a Strand account? <a class='text-blue-700' href='https://www.google.com'>Sign up</a></p>
 */

/**
 *  <div class='p-4 flex flex-col justify-evenly items-start'>
        <TextField classnames='self-center mb-8' label='Search' inputType='text' rounded />
        <ColorSwatchContainer heading='Recently Viewed'>
          <ColorSwatch color='#a43636' />
          <ColorSwatch color='#a43636' />
        </ColorSwatchContainer>

        <ColorSwatchContainer heading='Library'>
          <ColorSwatch color='#a43636' />
          <ColorSwatch color='#a43636' />
        </ColorSwatchContainer>

        <ColorSwatchContainer heading='Shopping List'>
          <ColorSwatch color='#a43636' />
          <ColorSwatch color='#a43636' />
        </ColorSwatchContainer>
      </div>
 */