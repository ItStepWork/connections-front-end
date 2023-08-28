// 'use server'
import Group from "@/components/group/group"
// import type { GetServerSideProps } from 'next'

// export const getServerSideProps: GetServerSideProps = async (context: any) => {
 
//   return (<>
//     <Group id={context.params.id} />
//   </>)
// }
// export default getServerSideProps
export default function Page({ params }: { params: { id: string } }) { 
  return  <Group id={params.id} />
}