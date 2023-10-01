import { ApiService } from './api.service'

export class CelebrationService {
	static async getBirthdaysNow(id: string) {
		return await ApiService.get('Celebration/GetBirthdaysNow?id=' + id, [])
	}

	static async getBirthdaysSoon(id: string) {
		return await ApiService.get('Celebration/GetBirthdaysSoon?id=' + id, [])
	}

	static async addEvent(request: object) {
		return await ApiService.post('Celebration/AddEvent', request, null)
	}
}
