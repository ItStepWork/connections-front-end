import { signOut } from 'next-auth/react'
import { toast } from 'react-toastify'
import { FileFormats } from '../enums/all.enum'

export class CheckService {
	static date: Date = new Date()

	static async signOut(session: any, error: any) {
		let ticks: number = CheckService.date.getTime()
		if (ticks + 1000 < new Date().getTime()) {
			CheckService.date = new Date()
			if (session !== null && error?.response?.status === 401) {
				await signOut()
			}
			if (error?.response?.status === 409) {
				error?.response?.data && toast.info(error?.response?.data, {})
			}
		}
	}
	static imageFormat(img: string) {
		if (
			img.toLocaleLowerCase().endsWith(FileFormats.Jpg) ||
			img.toLocaleLowerCase().endsWith(FileFormats.Jpeg) ||
			img.toLocaleLowerCase().endsWith(FileFormats.Avif) ||
			img.toLocaleLowerCase().endsWith(FileFormats.Gif) ||
			img.toLocaleLowerCase().endsWith(FileFormats.Svg) ||
			img.toLocaleLowerCase().endsWith(FileFormats.Webp) ||
			img.toLocaleLowerCase().endsWith(FileFormats.Png)
		)
			return true
		else return false
	}
}
