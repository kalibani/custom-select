import { FC } from 'react'
import { Option } from '@/types/select'

interface SelectItemProps {
  option: Option
  isSelected: boolean
  onClick: (option: Option) => void
}

const SelectItem: FC<SelectItemProps> = ({ option, isSelected, onClick }) => {
  return (
    <div
      key={option.value}
      className={`cursor-pointer px-4 py-2 ${isSelected ? 'bg-teal-50' : 'bg-white'} text-gray-500 hover:bg-teal-50`}
      onClick={() => onClick(option)}
    >
      {option.label}
    </div>
  )
}

export default SelectItem
