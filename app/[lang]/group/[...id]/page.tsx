// 'use server'
import { Locale } from "../../../../i18n.config";
import { getDictionary } from "../../../../locale-dictionary";
import Group from "../../components/group/group";
// import type { GetServerSideProps } from 'next'

// export const getServerSideProps: GetServerSideProps = async (context: any) => {

//   return (<>
//     <Group id={context.params.id} />
//   </>)
// }
// export default getServerSideProps
interface PageProps {
  params: { id: string, lang: Locale };
  
}

export default async function Page({params}: PageProps) {
  const localDictionary = await getDictionary(params.lang)
  return <Group id={params.id} local={localDictionary} />
}