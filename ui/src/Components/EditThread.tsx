import { AnchorThread, ClassicColorworksThread, DmcThread, IThread, WeeksDyeWorksThread } from "../../Models"
import { BrandMapping, ThreadBrandType } from "../../Types"
import EditDmcThread from "./EditDmcThread"
import EditAnchorThread from "./EditAnchorThread"
import { IoCloseOutline } from 'solid-icons/io'
import EditWeeksDyeWorksThread from "./EditWeeksDyeWorksThread"
import EditClassicColorworksThread from "./EditClassicColorworksThread"
import { AiOutlineDelete } from 'solid-icons/ai'


export const EditThread = ({ thread, mutate, onClose }: { thread: IThread, mutate: any, onClose: () => void }) => {
    const brand = thread.getBrand()

    const RenderEditModal = brand === 'dmc' ?
        <EditDmcThread thread={(thread as DmcThread)} mutate={mutate} />
        : brand === 'anchor' ? <EditAnchorThread thread={(thread as AnchorThread)} mutate={mutate} />
            : brand === 'weeksDyeWorks' ? <EditWeeksDyeWorksThread thread={(thread as WeeksDyeWorksThread)} mutate={mutate} />
                : <EditClassicColorworksThread thread={(thread as ClassicColorworksThread)} mutate={mutate} />

    return <div class='z-10 fixed bg-white min-w-[350px] top-[100px] mb-3 flex flex-col items-center self-center rounded-md border-black border-2 p-2' >
        <IoCloseOutline class='self-end text-red-600' onClick={() => onClose()} />
        <p class="text-center text-lg font-light text-blue-500">Edit Thread</p>
        {RenderEditModal}
        {false && <>
            <p>{thread.getCode()}</p>
            <p>{thread.getDescription()}</p>
            <div class='flex flex-row items-center gap-2' ><div class='w-4 h-4 rounded-md' style={{ background: thread.getColor() }} /> <p>{thread.getColor()}</p></div>

            <div>
                {thread.getKeywords().map(keyword => <p>{keyword}</p>)}
            </div>
        </>}
        <AiOutlineDelete class='fill-red-600 w-8 h-8' onClick={() => {
            thread.deleteThread()
            mutate((p: IThread[]) => p.filter((x: IThread) => {
                if (brand === 'dmc' || brand === 'anchor')
                    return x.getCode() !== thread.getCode()
                else
                    return x.getDescription() !== thread.getDescription()
            }))
            onClose()
        }} />
    </div>
}

