import { Typography } from "antd";

import useGetSettings from "@/hooks/settings/useGetSettings";
import { useLanguage } from "@/hooks/useTranslate";

import { Setting } from "@/models/settings.model";

const Footer = () => {
  const { data: settings = [] } = useGetSettings();
  const { value } = useLanguage();
  const footerSetting = settings.find((item: Setting) => item.key === (value === 'vi' ? 'footerContentVi' : 'footerContentEn'));

  return (
    <>
      <div className='h-[1px] bg-slate-200'></div>
      <div className='pt-4 pl-24 lg:px-12 lg:py-12 sm:px-4 sm:py-4'>
        <Typography
          className='mb-4'
          dangerouslySetInnerHTML={{ __html: footerSetting?.value }}>
        </Typography>
      </div>
    </>
  )
}

export default Footer;
