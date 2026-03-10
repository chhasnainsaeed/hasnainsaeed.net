import { createContext, useContext } from 'react'

const SeoContext = createContext(null)

export function SeoProvider({ children, head }) {
  return <SeoContext.Provider value={head}>{children}</SeoContext.Provider>
}

export function useSeoHead() {
  return useContext(SeoContext)
}
