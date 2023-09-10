import { Locale } from "../../../../i18n.config";
import { getDictionary } from "../../../../locale-dictionary";
import Profile from "../../components/profile/profile";

interface PageProps {
  params: { id: string, lang: Locale };
  
}

export default async function Page({params}: PageProps) {
  const localDictionary = await getDictionary(params.lang)
  return <Profile id={params.id} local={localDictionary} />
}