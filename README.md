
# Custom Select Component

A customizable select component using React and TypeScript.

## Features

- **Searchable Dropdown**: Implement a search feature within the dropdown.
- **Portal Support**: Allow the dropdown to be used with or without a portal.
- **Single or Multiple Selection**: Enable the dropdown to support both single and multiple option selections.
- **Customizable Option Rendering**: Allow customization of how options are rendered.
- **Search Filtering**: Ensure the search can filter a long list of options into a shorter list.
- **Toggle Features**: Allow each feature (like search) to be turned on or off.


## Installation

To install the package, run:

```bash
npm install makyo-multi-select
```

Or With Yarn

```bash
yarn add makyo-multi-select
```


## Basic Usage

## Typescript

```import React from 'react';
import { Select, Option } from 'makyo-multi-select';
import "makyo-multi-select/dist/style.css";

const options: Option[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option with icon 2' },
  { value: '3', label: 'Option with number 3' },
  { value: '4', label: 'long long long long option 4' },
  { value: '5', label: 'long long long long long option 5' },
  { value: '6', label: 'long long long long long long option 6' },
  // Add more options as needed
];

const App: React.FC = () => {
  const handleMultiSelectChange = (selected: Option | Option[]) => {
    console.log('Selected:', selected);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Multi Select Component</h1>
      <Select
        options={options}
        onChange={handleMultiSelectChange}
        multiple={true}
        withSearch={true}
        portal={true}
        zIndex={1000}
        outlined={false}
    </div>
  );
};

export default App;
```

## Javascript

```import React from 'react';
import { Select } from 'makyo-multi-select';
import "makyo-multi-select/dist/style.css";

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option with icon 2' },
  { value: '3', label: 'Option with number 3' },
  { value: '4', label: 'long long long long option 4' },
  { value: '5', label: 'long long long long long option 5' },
  { value: '6', label: 'long long long long long long option 6' },
  // Add more options as needed
];

const App = () => {
  const handleMultiSelectChange = (selected) => {
    console.log('Selected:', selected);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Multi Select Component</h1>
      <Select
        options={options}
        onChange={handleMultiSelectChange}
        multiple={true}
        withSearch={true}
        portal={true}
        zIndex={1000}
        outlined={false}
    </div>
  );
};

export default App;
```

## Custom Option Rendering

You can customize how each option is rendered using the `customRenderOption` prop. This prop accepts a function that receives an option object and returns a React element. Here's an example:

```import React from 'react';
import { Select } from 'makyo-multi-select';

const options: Option = [
  { value: 'Abe', label: 'Abe', customAbbreviation: 'A' },
  { value: 'John', label: 'John', customAbbreviation: 'J' },
  { value: 'Dustin', label: 'Dustin', customAbbreviation: 'D' },
];

const customRenderOption = ({ label, customAbbreviation }: Option) => (
  <div
    style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
  >
    <div>{label}</div>
    <div style={{ marginLeft: "10px", color: "#ccc" }}>
      {customAbbreviation}
    </div>
  </div>
);

const App = () => {
  return (
    <Select
      options={options}
      customRenderOption={customRenderOption}
    />
  );
};

export default App;
```

## Available Props


| Prop           | Type                                                            | Default Value | Description                                                                                                    |
|----------------|-----------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------|
| `options`      | `Option[]`                                                      | `[]`          | List of options to select from.                                                                                |
| `multiple`   | `boolean`                                                       | `true`        | Enable or disable multiple selection.                                                                          |
| `onChange`     | `function` | `() => void`                                     | Callback function to handle the change event when options are selected or unselected.                          |
| `portal`       | `boolean`                                                       | `false`       | Allow the dropdown to be used with or without a portal.                                                        |               | Custom function to render each option.                                                                         |
| `withSearch`   | `boolean`                                                       | `true`        | Enable or disable the search feature within the dropdown.                                                      |
| `zIndex`       | `number`                                                        | `50`          | Ensure the floating menu works with elements that have a z-index greater than the specified value.             |
| `outlined`       | `boolean`                                                        | `false`          | Enable or disable outline style.             |
| `customRenderOption`       | `(option: Option) => React.ReactNode`                                                        | `undefined`          | Custom function to render each option.             |


## Storybook Usage
In the project directory, you can run: 
```
npm run storybook
```

This will open Storybook in your browser, where you can explore various configurations and usage examples of the Select component.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes, improvements, or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

If you encounter any issues or have questions, feel free to open an issue on GitHub or contact the maintainers.
