import { Button } from "@nextui-org/react"

type Props = {
  onSave?: () => void
  saveLabel?: string
  saveColor?: "primary" | "danger"
  onClose: () => void
  loading?: boolean
}

export default function ModalActions({
  onSave,
  saveLabel = "Guardar",
  saveColor = "primary",
  onClose,
  loading,
}: Props) {
  return (
    <>
      <Button type="button" variant="light" onClick={onClose}>
        Cerrar
      </Button>
      <Button
        type="submit"
        color={saveColor}
        onClick={onSave}
        isLoading={loading}
      >
        {saveLabel}
      </Button>
    </>
  )
}
