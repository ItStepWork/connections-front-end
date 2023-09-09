import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import SignUp from "../components/sign-up/sign-up";

export default async function SignUpPage({ params: { lang }}: { params: { lang: Locale }}, props : any) {

  const localDictionary = await getDictionary(lang)
  
  return (
    <>
      <SignUp local={localDictionary}/>
    </>  
  )
}
