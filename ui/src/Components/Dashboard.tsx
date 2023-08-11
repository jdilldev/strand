import { TextField } from "./Shared"
import { ColorSwatchContainer, ColorSwatch } from "./ColorSwatch"


export const Dashboard = () => {
    return <div class='p-4 flex flex-col justify-evenly items-start'>
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
}