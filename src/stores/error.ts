import { create } from 'zustand'

type ErrorState = {
  error: Error | null
  updateError: (error: Error | null) => void
  clearError: () => void
}

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,
  updateError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
