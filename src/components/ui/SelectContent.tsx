import React, { FC } from 'react'
import classNames from 'classnames'
import { Search, CircleX } from 'lucide-react'

// Components
import SelectItem from './SelectItem'

import { SelectProps, Option } from '@/types/select'

interface SelectContentProps
  extends Pick<SelectProps, 'options' | 'withSearch' | 'zIndex'> {
  selectedOptions: Option[]
  handleOptionClick: (option: Option) => void
  searchTerm: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveSearch: () => void
  selectRef: React.RefObject<HTMLDivElement>
  selectContentRef: React.RefObject<HTMLDivElement>
}
const SelectContent: FC<SelectContentProps> = ({
  options,
  selectedOptions,
  handleOptionClick,
  searchTerm,
  handleSearchChange,
  handleRemoveSearch,
  withSearch,
  zIndex,
  selectRef,
  selectContentRef,
}) => {
  return (
    <div
      className={classNames(
        'absolute w-full bg-white border border-gray-300 rounded-sm shadow-lg mt-1.5',
        {
          'z-50': zIndex === 50,
          'z-100': zIndex === 100,
        }
      )}
      style={{
        zIndex,
        width: selectRef.current?.offsetWidth, // Set the width dynamically
        left: 0, // Adjust this if needed for proper positioning
      }}
      ref={selectContentRef}
    >
      {withSearch && (
        <>
          <Search className="absolute h-4 w-4 top-3 left-4 text-gray-400" />
          <input
            type="text"
            className="w-full px-12 py-2 border-b border-gray-300 outline-none text-gray-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <CircleX
              className="absolute h-4 w-4 top-3 right-4 text-gray-500 cursor-pointer"
              onClick={handleRemoveSearch}
            />
          )}
        </>
      )}
      <div className="max-h-60 overflow-y-auto">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            option={option}
            isSelected={selectedOptions.some(
              (selected) => selected.value === option.value
            )}
            onClick={handleOptionClick}
          />
        ))}
      </div>
    </div>
  )
}

export default SelectContent
