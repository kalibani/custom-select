import { FC } from 'react'
// types
import { Option } from '@/types/select'

// Placed SelectItemProps close to its usage since this will not share to another component
interface SelectItemProps {
  option: Option
  isSelected: boolean
  searchTerm: string
  onClick: (option: Option) => void
}

const SelectItem: FC<SelectItemProps> = ({
  option,
  isSelected,
  searchTerm,
  onClick,
}) => {
  const parts = option.label.split(new RegExp(`(${searchTerm})`, 'gi'))
  return (
    <div
      key={option.value}
      className={`cursor-pointer px-4 py-2 ${isSelected ? 'bg-teal-50' : 'bg-white'} text-gray-500 hover:bg-teal-50`}
      onClick={() => onClick(option)}
    >
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} className="bg-teal-400">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </div>
  )
}

export default SelectItem
