import { createContext, useContext } from 'react'

const AccordionItemContext = createContext({
  isOpen: false,
  toggle: () => {},
})

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error('AccordionItemContext 안에서 사용해야 합니다.')
  }
  return context
}

export { AccordionItemContext, useAccordionItemContext }
