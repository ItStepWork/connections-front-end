import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import { SignIn } from "../components/sign-in/sign-in";

export default async function SignInPage({ params: { lang }}: { params: { lang: Locale }}) {

  const localDictionary = await getDictionary(lang)
  
  return (
    <>
      <SignIn local={localDictionary}/>
    </>  
  )
}
