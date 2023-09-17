import { authConfig } from "../../../configs/auth";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import Messaging from "../components/messaging/main/messaging";
import { getServerSession } from "next-auth";

export default async function MessagingPage({ params: { lang }}: { params: { lang: Locale }}, props : any){
  const localDictionary = await getDictionary(lang)
  const session = await getServerSession(authConfig);
  return (<Messaging local={localDictionary}  session={session}/>)
};
