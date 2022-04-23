import { IPromptConfig, useDialog } from '../../lib/context/useDialog'
import { Button } from '../common/Button'

export const Prompt = () => {
    const { close, config } = useDialog()
    const { title, message } = config as IPromptConfig
    return (
        <>
            <div className="relative border-b p-3 min-w-[450px]">
                <h3 className="text-lg text-center font-semibold text-gray-900 lg:text-2xl dark:text-white">{title}</h3>
            </div>
            <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{message}</p>
            </div>
            <div className="flex flex-row gap-x-4 px-6 pb-6">
                <Button title="Confirm" onClick={() => close(true)} data-modal-toggle="defaultModal" />
                <Button title="Cancel" onClick={() => close(false)} data-modal-toggle="defaultModal" warning solid />
            </div>
        </>
    )
}
