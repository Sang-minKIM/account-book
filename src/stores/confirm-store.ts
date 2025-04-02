import { create } from 'zustand'

export interface ConfirmOptions {
  title: string
  description: string
}

interface ConfirmState {
  isOpen: boolean
  resolve: ((value: boolean) => void) | null
  title: string
  description: string
  openConfirm: ({ title, description }: ConfirmOptions) => Promise<boolean>
  closeConfirm: (result: boolean) => void
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  resolve: null,
  title: '',
  description: '',
  openConfirm: ({ title, description }) => {
    return new Promise<boolean>((resolve) => {
      set({ resolve, isOpen: true, title, description })
    })
  },
  closeConfirm: (result: boolean) => {
    set((state) => {
      state.resolve?.(result)
      return { isOpen: false, resolve: null }
    })
  },
}))

export const confirmStore = {
  open: ({ title, description }: ConfirmOptions) => useConfirmStore.getState().openConfirm({ title, description }),
}
