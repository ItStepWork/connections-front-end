import { notFound } from "next/navigation"
import { Locale } from "../../../i18n.config"

export default function NotFoundCatchAll() {
  notFound()
}