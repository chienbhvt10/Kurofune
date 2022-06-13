import React, { useCallback, useState } from "react";
import { Divider, Form, Input, Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
const SelectFieldSearch = ({
  field,
  error,
  label,
  labelCol,
  wrapperCol,
  rules,
  response,
  placeholder,
  options,
  disabled,
}) => {
  const { t } = useTranslation();
  const [items, setItems] = useState(options);
  const [name, setName] = useState('');
  const debounceSearch =(keySearch)=>{
    if(keySearch) {
      let arrayFilter = options.filter((item,index_)=>{
        return  String(item.label).toLocaleLowerCase().includes(String(keySearch).toLocaleLowerCase())
      })
      setItems(arrayFilter)
    }else{
      setItems(options)
    }
  }

  const debounceDropDown = useCallback(debounce((keySearch) => debounceSearch(keySearch), 500), [])
  const onNameChange = (event) => {
    setName(event.target.value);
    debounceDropDown(event.target.value)
  };
  const onChange = () => {
    setName('');
    setItems(options)
  };
 
  return (
    <Form.Item
      name={field}
      label={label}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      rules={rules}
      help={
        response?.message?.[error] &&
        response?.message?.[error].length &&
        response?.message?.[error][0]
      }
      validateStatus={
        response?.message?.[error] && response?.message?.[error].length
          ? "error"
          : ""
      }
    >
      <Select
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        // open={false}
        dropdownRender={(menu) => (
          <>
            <Divider
              style={{
                margin: '8px 0',
              }}
            />
           <Input value={name} onChange={onNameChange} />
            {menu}
          </>
          
        )}
      >
        {items?.map((option, index) => (
          <Select.Option key={index} value={option.value} >
            {option.label || t(option.label_translate)}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectFieldSearch;
