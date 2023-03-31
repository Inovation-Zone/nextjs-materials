import { Select } from 'antd';

import { useLanguage } from '@/hooks/useTranslate';

const { Option } = Select;

const SwitchLanguage: React.FC = () => {
  const { value, changeLang } = useLanguage();

  const handleLanguageChange = (value: string) => {
    changeLang(value);
  };

  return (
    <Select value={value} className='w-[130px]' onChange={handleLanguageChange}>
      <Option value="en">English</Option>
      <Option value="vi">Vietnamese</Option>
    </Select>
  );
};

export default SwitchLanguage;
