import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useEffect } from 'react'

export default function Modal(showModal) {

    useEffect(() => {
        console.log(showModal);
        setIsOpen(showModal.showModal);
    }, [showModal])

    let [isOpen, setIsOpen] = useState(false)
    console.log(showModal.showModal)

    return (
        <Dialog open={showModal.showModal} onClose={() => (false)}>
            <Dialog.Panel>
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                    This will permanently deactivate your account
                </Dialog.Description>
                <button onClick={() => setIsOpen(false)}>Deactivate</button>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
            </Dialog.Panel>
        </Dialog>
    )
}