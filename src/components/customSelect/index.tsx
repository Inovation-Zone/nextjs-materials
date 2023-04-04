import { Col, Typography } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Option } from '@/models/products.model';

type Ref = {
  getValue: () => Option | undefined;
  setValue: (opt: Option) => void;
  setOptions: (opt: Option[]) => void;
};

export type Layout = 'ver' | 'hoz';

interface CustomSelectProps {
  label: string;
  layout?: Layout;
}

const CustomSelect = forwardRef<Ref, CustomSelectProps>(({ label, layout }, ref) => {
  const [options, setOptions] = useState<Option[]>();
  const [optionSelected, setOptionSelected] = useState<Option | undefined>();

  useEffect(() => {
    setOptionSelected(options?.length ? options[0] : undefined);
  }, [options]);

  useImperativeHandle(ref, () => ({
    getValue() {
      return optionSelected;
    },
    setValue(opt: Option) {
      setOptionSelected(opt);
    },
    setOptions(opts: Option[]) {
      setOptions(opts);
    },
  }));

  return (
    <>
      <Typography className='font-bold text-gray-500 mt-12'>{label}</Typography >
      <Col className={`${layout !== 'ver' && 'flex'} mt-4`}>
        {options?.map((opt) => (
          <div
            key={opt.value}
            className={`border px-2 py-1 cursor-pointer ${optionSelected?.value === opt.value && 'bg-[#21ace3] text-white'}`}
            onClick={() => setOptionSelected(opt)}
          >
            {opt.name}
          </div>
        ))}
      </Col>
    </>
  )
});

export default CustomSelect;
