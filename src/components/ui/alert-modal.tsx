'use client'

import { useEffect, useState } from "react"
import Modal from "../ui/modal"
import { Button } from "./button"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  

  return (
    <Modal
      title="Jeste li sigurni?"
      description="Ovaj artikal se ne može vratiti"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Otkaži
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Potvrdi
        </Button>
      </div>

    </Modal>
  );
}

export default AlertModal;