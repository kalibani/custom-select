import { Meta, StoryObj, Preview } from '@storybook/react'
import Select from '@/components/ui/Select'
import { options } from '@/static-data/options'

const meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    options: {
      control: 'object',
      description: 'The list of options available for selection.',
    },
    multiple: {
      control: 'boolean',
      description: 'Allows selection of multiple options.',
    },
    withSearch: {
      control: 'boolean',
      description:
        'Enables the search functionality within the select dropdown.',
    },
    portal: {
      control: 'boolean',
      description:
        'Renders the dropdown options using a React portal, positioning them outside the usual DOM hierarchy.',
    },
    outlined: {
      control: 'boolean',
      description: 'Applies an outlined style to the select component.',
    },
    zIndex: {
      control: 'number',
      description: 'Specifies the z-index for the dropdown menu.',
    },
    onChange: {
      action: 'changed',
      description:
        'Callback function triggered when the selected options change.',
    },
  },
  args: {
    options: options,
    multiple: true,
    onChange: () => {},
    withSearch: true,
    portal: false,
    outlined: false,
    zIndex: 1100,
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: options,
    multiple: true,
    onChange: () => {},
    withSearch: true,
    portal: false,
    outlined: false,
    zIndex: 1100,
  },
}

export const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
}
