import React from 'react'
import Modal from 'react-modal'
import { IDialogBaseConfig, useDialog } from '../../lib/context/useDialog'
import { Alert } from './AlertDialog'
import { Prompt } from './PromptDialog'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next')

export default () => {
    const { config, Component, ...dialog } = useDialog()
    const { title, ...modalProps } = config as IDialogBaseConfig

    return (
        <Modal
            isOpen={dialog.isActive}
            onRequestClose={dialog.close}
            contentLabel={config.title}
            className="top-1/3 left-1/2 right-auto bottom-auto -translate-x-1/2 absolute bg-gray-50 rounded-lg shadow outline-none"
            overlayClassName="top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 fixed z-40"
            {...modalProps}
        >
            {dialog.type === 'alert' && <Alert />}
            {dialog.type === 'prompt' && <Prompt />}
            {dialog.type === 'custom' && Component}
        </Modal>
    )
}
