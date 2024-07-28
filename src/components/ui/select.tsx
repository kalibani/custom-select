import { useState, useEffect, useRef, FC, ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { SelectProps, Option } from '@/types/select'
import { ChevronDown, CircleX } from 'lucide-react'
import SelectContent from './SelectContent'
import useClickOutside from '@/hooks/useClickOutside'

const SelectContainer: FC<SelectProps> = ({
  options,
  multiple = true,
  onChange,
  portal = false,
  withSearch = true,
  zIndex = 50,
  outlined = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  const selectRef = useRef<HTMLDivElement>(null)
  const selectContentRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (option: Option) => {
    if (multiple) {
      const isSelected = selectedOptions.some(
        (selected) => selected.value === option.value
      )
      const newSelectedOptions = isSelected
        ? selectedOptions.filter((selected) => selected.value !== option.value)
        : [...selectedOptions, option]
      setSelectedOptions(newSelectedOptions)
      onChange(newSelectedOptions)
    } else {
      setSelectedOptions([option])
      onChange(option)
      setIsOpen(false)
    }
  }

  const handleRemoveOption = (option: Option) => {
    const newSelectedOptions = selectedOptions.filter(
      (selected) => selected.value !== option.value
    )
    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleRemoveSearch = () => {
    setSearchTerm('')
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  useClickOutside([selectRef, selectContentRef], () => setIsOpen(false))

  useEffect(() => {
    setSelectedOptions([])
    onChange([])
  }, [onChange, multiple])

  return (
    <div className="flex items-center max-h-max">
      <label className="mr-4 lg:mr-20 text-gray-700">Label</label>
      <div className="relative w-full" ref={selectRef}>
        <div
          className={classNames(
            'relative border border-gray-300 rounded p-2 cursor-pointer h-10',
            {
              'bg-gray-300': outlined,
            }
          )}
          onClick={handleToggle}
        >
          <div className="flex gap-1 max-w-[300px] md:max-w-[980px] overflow-auto no-scrollbar">
            {selectedOptions.length === 0
              ? ''
              : selectedOptions.map((opt) => (
                  <span
                    key={opt.value}
                    className="flex bg-gray-100 rounded-full p-2 text-xs font-semibold text-gray-500 cursor-pointer gap-1 items-center h-6"
                    onClick={() => handleRemoveOption(opt)}
                  >
                    <span className="w-max">{opt.label}</span>
                    <CircleX className="w-4 h-4 text-gray-500" />
                  </span>
                ))}
          </div>
          <ChevronDown className="h-4 w-4 absolute right-2 top-3 text-gray-500" />
        </div>
        {isOpen &&
          (portal ? (
            createPortal(
              <SelectContent
                options={options}
                selectedOptions={selectedOptions}
                handleOptionClick={handleOptionClick}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleRemoveSearch={handleRemoveSearch}
                withSearch={withSearch}
                zIndex={zIndex}
                selectRef={selectRef}
                selectContentRef={selectContentRef}
              />,
              document.body
            )
          ) : (
            <SelectContent
              options={options}
              selectedOptions={selectedOptions}
              handleOptionClick={handleOptionClick}
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              handleRemoveSearch={handleRemoveSearch}
              withSearch={withSearch}
              zIndex={zIndex}
              selectRef={selectRef}
              selectContentRef={selectContentRef}
            />
          ))}
      </div>
    </div>
  )
}

export default SelectContainer
