import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
   .rt-BaseDialogOverlay {
    &:where([data-state='closed']) {
      animation: none !important;
    }
    &:where([data-state='open'])::before {
      animation: rt-fade-in 150ms cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    &:where([data-state='closed'])::before {
      animation: none !important;
      opacity: 0;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  .rt-BaseDialogContent {
    &:where([data-state='open']) {
      animation: rt-dialog-content-show 150ms cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    &:where([data-state='closed']) {
      animation: none !important;
      opacity: 0;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
`
