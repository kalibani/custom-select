import { FC, ChangeEvent, RefObject } from 'react'
import { Search, CircleX } from 'lucide-react'

// Components
import SelectItem from './SelectItem'

// Types
import { SelectProps, Option } from '@/types/select'

// Placed SelectContentProps close to its usage since this will not be shared with another component
interface SelectContentProps
  extends Omit<SelectProps, 'onChange' | 'multiple' | 'outlined'> {
  selectedOptions: Option[]
  handleOptionClick: (option: Option) => void
  searchTerm: string
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleRemoveSearch: () => void
  selectRef: RefObject<HTMLDivElement>
  selectContentRef: RefObject<HTMLDivElement>
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
  portal,
  renderOption,
}) => {
  return (
    <div
      className={`absolute w-full bg-white border border-gray-300 rounded-sm shadow-lg mt-1.5`}
      style={{
        zIndex,
        width: selectRef.current?.offsetWidth, // Set the width dynamically
        left: portal ? selectRef.current?.offsetLeft : 0, // Set left dynamically
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
        {options.map((option, index) => {
          const isSelected = selectedOptions.some(
            (selected) => selected.value === option.value
          )

          if (renderOption) {
            return (
              <div
                key={`${option.value}-${index}`}
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer px-4 py-2 ${isSelected ? 'bg-teal-50' : 'bg-white'} text-gray-500 hover:bg-teal-50`}
              >
                {renderOption(option)}
              </div>
            )
          }

          return (
            <SelectItem
              key={`${option.value}-${index}`}
              option={option}
              searchTerm={searchTerm}
              isSelected={isSelected}
              onClick={handleOptionClick}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SelectContent
