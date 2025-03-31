import { useConfirmStore, ConfirmOptions } from '~/stores/confirm-store'

export const useConfirm = () => {
  const { openConfirm } = useConfirmStore()

  return ({ title, description }: ConfirmOptions) => openConfirm({ title, description })
}
