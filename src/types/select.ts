// Placed type and interface to types directory to share among select component

export type Option = {
  value: string
  label: string
  [key: string]: any
}

export interface SelectProps {
  options: Option[]
  multiple?: boolean
  onChange: (selected: Option | Option[]) => void
  portal?: boolean
  withSearch?: boolean
  zIndex?: number
  outlined?: boolean
  customRenderOption?: (option: Option) => React.ReactNode
}
