import React from 'react'
import Modal from 'react-modal'
import { useDialog } from '../../lib/context/useDialog'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next')

export default () => {
    const { config, ...dialog } = useDialog()

    return (
        <Modal
            isOpen={dialog.isActive}
            onRequestClose={dialog.close}
            contentLabel={config.title}
            className="top-1/3 left-1/2 right-auto bottom-auto -translate-x-1/2 absolute bg-gray-50 rounded-lg shadow outline-none"
            overlayClassName="top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 fixed z-50"
        >
            <div className="relative border-b p-3 min-w-[450px]">
                <h3 className="text-lg text-center font-semibold text-gray-900 lg:text-2xl dark:text-white">
                    {config.title}
                </h3>
                <button
                    type="button"
                    onClick={() => dialog.close()}
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
                    data-modal-toggle="defaultModal"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
            <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{config.message}</p>
            </div>
            <div className="px-6 pb-6 space-x-2">
                <button
                    data-modal-toggle="defaultModal"
                    onClick={() => dialog.close()}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Ok
                </button>
            </div>
        </Modal>
    )
}
