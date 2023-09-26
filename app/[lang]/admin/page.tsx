import { Locale } from "../../../i18n.config";
import Admin from "../components/admin/main/page";
import { getDictionary } from "../../../locale-dictionary";
import { getServerSession } from "next-auth";
import { authConfig } from "../../../configs/auth";

export default async function AdminPage({ params: { lang }}: { params: { lang: Locale }}) {
  const locDictionary = await getDictionary(lang)
  const session = await getServerSession(authConfig);
  if (locDictionary !== null) return (<Admin local={locDictionary} session={session}/>)
  else return (<></>)
};
