import { Col, Typography } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { useLanguage } from '@/hooks/useTranslate';

import { WoodTypeOption } from '@/models/products.model';

type Ref = {
  getValue: () => WoodTypeOption | undefined;
  setValue: (opt: WoodTypeOption) => void;
  setOptions: (opt: WoodTypeOption[]) => void;
};

export type Layout = 'ver' | 'hoz';

interface CustomSelectProps {
  label: string;
  layout?: Layout;
}

const CustomSelectWoodType = forwardRef<Ref, CustomSelectProps>(({ label, layout }, ref) => {
  const [options, setOptions] = useState<WoodTypeOption[]>();
  const [optionSelected, setOptionSelected] = useState<WoodTypeOption | undefined>();
  const { value } = useLanguage();

  useEffect(() => {
    setOptionSelected(options?.length ? options[0] : undefined);
  }, [options]);

  useImperativeHandle(ref, () => ({
    getValue() {
      return optionSelected;
    },
    setValue(opt: WoodTypeOption) {
      setOptionSelected(opt);
    },
    setOptions(opts: WoodTypeOption[]) {
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
            {opt?.[`${value}_name` as keyof WoodTypeOption]}
          </div>
        ))}
      </Col>
    </>
  )
});

export default CustomSelectWoodType;
