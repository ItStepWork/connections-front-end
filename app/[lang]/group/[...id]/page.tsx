// 'use server'
import { Locale } from "../../../../i18n.config";
import { getDictionary } from "../../../../locale-dictionary";
import Group from "../../components/group/group";

interface PageProps {
  params: { id: string, lang: Locale };

}

export default async function Page({ params }: PageProps) {
  const localDictionary = await getDictionary(params.lang)
  return <Group id={params.id} local={localDictionary} lang={params.lang}/>
}