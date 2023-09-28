import { getServerSession } from "next-auth";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import { authConfig } from "../../../configs/auth";
import Support from "../components/support/support";

interface PageProps {
  params: { id: string, lang: Locale };
  
}

export default async function SupportPage({params}: PageProps){
  const localDictionary = await getDictionary(params.lang)
  const session = await getServerSession(authConfig);
  return (<Support local={localDictionary} session={session} />)
};
