import { Meta, StoryObj } from '@storybook/react'
import Select from '../components/ui/select'
import { options } from '../static-data/options'

const meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    options: {
      control: {
        type: 'object',
      },
    },
    multiple: { control: 'boolean' },
    withSearch: { control: 'boolean' },
    portal: { control: 'boolean' },
    zIndex: { control: { type: 'number', min: 0, max: 2000 } },
    onChange: { action: 'changed' },
    outlined: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options,
    multiple: true,
    onChange: () => {},
    withSearch: true,
    portal: false,
    outlined: false,
    zIndex: 100,
  },
}
