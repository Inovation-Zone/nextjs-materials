
import { useLanguage, useTranslate } from '@/hook/useTranslate';

export default function Home() {
  const trans = useTranslate();
  const { changeLang } = useLanguage();

  return (
    <>
      {trans.home.title}
      <button onClick={() => changeLang('vi')} >vi</button>
      <button onClick={() => changeLang('en')}>en</button>
    </>
  )
}

