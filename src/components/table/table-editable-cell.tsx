import { useState } from 'react'

interface TableEditableCellProps {
  renderEditable: (props: { endEdit: () => void }) => React.ReactNode
  renderReadOnly: (props: { startEdit: () => void }) => React.ReactNode
}

export const TableEditableCell = ({ renderEditable, renderReadOnly }: TableEditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const startEdit = () => {
    setIsEditing(true)
  }
  const endEdit = () => {
    setIsEditing(false)
  }
  return isEditing ? renderEditable({ endEdit }) : renderReadOnly({ startEdit })
}
