import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import Main from "../components/main/main/main";

export default async function Home({ params: { lang }}: { params: { lang: Locale }}, props : any) {

  const localDictionary = await getDictionary(lang)
  
  return (
    <main>
      <Main local={localDictionary}/>
    </main>
  )
}
