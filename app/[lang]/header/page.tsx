import React from "react"
import { Header } from "../components/header/header";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";

const HeaderPage = async ({ lang }: { lang: Locale }, props : any) => {

  const locDictionary = await getDictionary(lang)
  
  return (
    <>
      <Header local={locDictionary}/>
    </>
  )
};

export default HeaderPage;
