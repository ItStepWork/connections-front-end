import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import Messaging from "../components/messaging/main/messaging";

interface PageProps {
  params: { id: string, lang: Locale };
  
}

export default async function MessagingPage({params}: PageProps){
  const localDictionary = await getDictionary(params.lang)
  return (<Messaging />)
};
