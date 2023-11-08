import { ReactNode } from "react"
import ConfirmModal, { ConfirmModalProps } from "./Confirm"

type Props = Omit<ConfirmModalProps, "type" | "children"> & {
  children?: ReactNode
}

export default function DeleteModal(props: Props) {
  return (
    <ConfirmModal type="danger" {...props}>
      <p>
        ¿Estás seguro que deseas eliminar este elemento? Esta acción no se puede
        deshacer.
      </p>
    </ConfirmModal>
  )
}
