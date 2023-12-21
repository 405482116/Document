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


import React, { useState, ChangeEvent } from 'react';
import Fuse from 'fuse.js';

interface SearchResult {
  id: number;
  name: string;
}

interface SearchComponentProps {
  data: SearchResult[];
  keysToSearch: string[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({ data, keysToSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const fuse = new Fuse(data, {
    keys: keysToSearch,
    includeScore: true,
    threshold: 0.3,
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
    } else {
      const results = fuse.search(term);
      setSearchResults(results.map((result) => result.item));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Example usage
const data: SearchResult[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' },
  { id: 4, name: 'Grape' },
];

const App: React.FC = () => {
  return (
    <div>
      <h1>Fuzzy Search Example</h1>
      <SearchComponent data={data} keysToSearch={['name']} />
    </div>
  );
};

export default App;

