import { Locale } from "../../../i18n.config";
import Admin from "../components/admin/main/page";
import { getDictionary } from "../../../locale-dictionary";

export default async function AdminPage({ params: { lang }}: { params: { lang: Locale }}) {
  const locDictionary = await getDictionary(lang)
  if (locDictionary !== null) return (<main><Admin local={locDictionary} /></main>)
  else return (<></>)
};
