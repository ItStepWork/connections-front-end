import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import { Header } from "../components/header/header";

const HeaderPage = async ({ lang }: { lang: Locale }, props : any) => {
 
  const locDictionary = await getDictionary(lang)
  
  return (
    <>
      <Header local={locDictionary} lang={lang}/>
    </>
  )
};

export default HeaderPage;
