import { useRouter } from 'next/router'

import en from '@/public/lang/en';
import vi from '@/public/lang/vi';

const useTranslate = () => {
  const { locale } = useRouter();

  const trans = locale === 'vi' ? vi : en;

  return trans;
}

const useLanguage = () => {
  const router = useRouter();

  const changeLang = (lang: string) => {
    router.push('/', '/', { locale: lang });
  };

  return { changeLang };
};

export {
  useLanguage,
  useTranslate,
};
