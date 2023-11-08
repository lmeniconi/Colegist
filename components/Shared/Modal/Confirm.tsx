import React, { ReactNode } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react"
import ModalActions from "./Actions"

export type ConfirmModalProps = {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  onConfirm: () => void
  loading?: boolean
  children: ReactNode
  type: "default" | "danger"
}

export default function ConfirmModal({
  isOpen,
  onOpenChange,
  onConfirm,
  loading,
  children,
  type = "default",
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirmar</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <ModalActions
                onSave={onConfirm}
                saveLabel="Confirmar"
                saveColor={type === "default" ? "primary" : "danger"}
                onClose={onClose}
                loading={loading}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
