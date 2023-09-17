import { getServerSession } from "next-auth";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import Messaging from "../components/messaging/main/messaging";
import { authConfig } from "../../../configs/auth";

interface PageProps {
  params: { id: string, lang: Locale };
  
}

export default async function MessagingPage({params}: PageProps){
  const localDictionary = await getDictionary(params.lang)
  const session = await getServerSession(authConfig);
  return (<Messaging  local={localDictionary} session={session} />)
};
