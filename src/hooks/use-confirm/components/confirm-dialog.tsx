import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useConfirmStore } from '~/stores/confirm-store'

export const ConfirmDialog = () => {
  const { isOpen, title, description, closeConfirm } = useConfirmStore()

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{description}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" onClick={() => closeConfirm(false)}>
              취소
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={() => closeConfirm(true)}>
              확인
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
