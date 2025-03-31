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
    set({ isOpen: true, title, description })
    return new Promise<boolean>((resolve) => {
      set({ resolve })
    })
  },
  closeConfirm: (result: boolean) => {
    set((state) => {
      state.resolve?.(result)
      return { isOpen: false, resolve: null }
    })
  },
}))

