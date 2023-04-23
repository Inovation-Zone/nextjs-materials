import { Typography } from "antd";

import useGetSettings from "@/hooks/settings/useGetSettings";
import { useLanguage } from "@/hooks/useTranslate";

import { Setting } from "@/models/settings.model";


const Cover = () => {
  const { data: settings = [] } = useGetSettings();
  const { value } = useLanguage();
  const coverSetting = settings.find((item: Setting) => item.key === (value === 'vi' ? 'coverContentVi' : 'coverContentEn'));

  return (
    <div className='px-4 lg:px-12 lg:py-12 sm:py-12'>
      <Typography
        className='mb-4'
        dangerouslySetInnerHTML={{ __html: coverSetting?.value }}>
      </Typography>
    </div>
  )
}

export default Cover;
