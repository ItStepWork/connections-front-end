// 'use server'
import Group from "../groupCard/group"
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
 
  return (<>
    <Group id={context.params.id} />
  </>)
}
export default getServerSideProps