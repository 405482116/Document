import React, { useState } from 'react';
import Select, { components, ValueType, OptionTypeBase } from 'react-select';

interface OptionType {
  label: string;
  value: string;
  options?: OptionType[];
}

const { Option, Group } = components;

interface CustomSelectProps {
  value: ValueType<OptionType>;
  onChange: (value: ValueType<OptionType>) => void;
}

// Custom option component with expand icon
const CustomOption: React.FC<any> = (props) => (
  <Option {...props}>
    {props.data.options ? (
      <span style={{ paddingLeft: '10px' }}>{props.label}</span>
    ) : (
      props.label
    )}
  </Option>
);

// Custom group component with expand icon
const CustomGroup: React.FC<any> = (props) => (
  <Group {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span
        style={{ paddingRight: '5px', cursor: 'pointer' }}
        onClick={() => props.selectProps.onGroupToggle(props.label)}
      >
        {props.selectProps.expandedGroups.includes(props.label) ? '[-]' : '[+]'}
      </span>
      {props.label}
    </div>
    {props.selectProps.expandedGroups.includes(props.label) ? props.children : null}
  </Group>
);

const MultiSelectWithGroupAndExpand: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<ValueType<OptionType>>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const groupedOptions: OptionType[] = [
    {
      label: 'Fruits',
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'broccoli', label: 'Broccoli' },
        { value: 'cucumber', label: 'Cucumber' },
      ],
    },
    {
      label: 'Colors',
      options: [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
      ],
    },
  ];

  const handleSelectChange = (selectedOptions: ValueType<OptionType>) => {
    setSelectedOptions(selectedOptions);
  };

  const handleGroupToggle = (groupName: string) => {
    setExpandedGroups((prevGroups) =>
      prevGroups.includes(groupName)
        ? prevGroups.filter((group) => group !== groupName)
        : [...prevGroups, groupName]
    );
  };

  return (
    <div>
      <h2>Multi-Select with Groups and Expand Icon Example</h2>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
        options={groupedOptions}
        components={{
          Option: CustomOption,
          Group: (props: any) => (
            <CustomGroup {...props} selectProps={{ expandedGroups, onGroupToggle: handleGroupToggle }} />
          ),
        }}
      />
      <div>
        Selected options:
        {selectedOptions.map((option) => (
          <span key={option.value}> {option.label},</span>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectWithGroupAndExpand;
