import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import Main from "../components/main/main/main";
import { getServerSession } from "next-auth";
import { authConfig } from "../../../configs/auth";

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {

  const localDictionary = await getDictionary(lang)
  const session = await getServerSession(authConfig);
  return (<Main local={localDictionary} session={session} lang={lang}/>);
}
