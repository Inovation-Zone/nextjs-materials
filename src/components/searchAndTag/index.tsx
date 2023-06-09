import { AutoComplete, Button, Col, Row, Tag } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { useTranslate } from '@/hooks/useTranslate';

import { Option } from '@/models/products.model';

interface SearchAndTagInputProps {
  options: Option[];
}

type Ref = {
  getValues: () => Option[];
  setValues: (tags: Option[]) => void;
};

const SearchAndTagInput = forwardRef<Ref, SearchAndTagInputProps>(
  ({ options = [] }, ref) => {
    const translate = useTranslate();
    const [tags, setTags] = useState<Option[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const [inputValue, setInputValue] = useState('');

    useImperativeHandle(ref, () => ({
      getValues() {
        return tags;
      },
      setValues(tags: Option[]) {
        setTags(tags);
      },
    }));

    const handleTagClose = (tag: Option) => {
      // Remove tag from the list of tags
      setTags(tags.filter((t) => t.value !== tag.value));

      // Add the tag back to the options list
      setFilteredOptions([...filteredOptions, tag]);
    };

    const handleSearch = (value: string) => {
      // Filter out the tags that have already been added
      const newFilteredOptions = options.filter((option) => !tags.includes(option));

      // Filter the new filtered options by the user's search query
      const filteredBySearchOptions = newFilteredOptions.filter((option) =>
        option.name.toUpperCase().includes(value.toUpperCase())
      );

      setFilteredOptions(filteredBySearchOptions);
      setInputValue(value);
    };

    const handleSelect = (value: string, option: Option) => {
      setTags([...tags, option]);
      setFilteredOptions(filteredOptions.filter((o) => o.value !== value));
      setInputValue('');
    };

    const handleAddAll = () => {
      setTags(options);
      setFilteredOptions([]);
    };

    return (
      <Col className='flex'>
        <AutoComplete
          style={{ width: 300 }}
          options={filteredOptions.map((option) => ({ ...option, label: option.name }))}
          onSelect={handleSelect}
          onSearch={handleSearch}
          placeholder={translate.common.search}
          filterOption={false}
          value={inputValue}
        />
        {filteredOptions.map((option) => (
          <AutoComplete.Option
            key={option.value}
            value={option.value}>
            {option.name}
          </AutoComplete.Option>
        ))}
        <Button
          type="primary"
          style={{ marginLeft: '8px' }}
          onClick={handleAddAll}>
          {translate.common.addAll}
        </Button>
        <Row className='ml-4'>
          {tags.map((tag) => (
            <Tag
              closable
              key={tag?.value}
              onClose={() => handleTagClose(tag)}
              className='flex items-center justify-center'>
              {tag?.name}
            </Tag>
          ))}
        </Row>
      </Col>
    );
  }
)

export default SearchAndTagInput;
