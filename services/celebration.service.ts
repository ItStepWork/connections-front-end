import { ApiService } from './api.service'

export class CelebrationService {
	static async getBirthdaysNow() {
		return await ApiService.get('Celebration/GetBirthdaysNow', [])
	}

	static async getBirthdaysSoon() {
		return await ApiService.get('Celebration/GetBirthdaysSoon', [])
	}

	static async getEvents() {
		return await ApiService.get('Celebration/GetEvents', [])
	}

	static async addEvent(request: object) {
		return await ApiService.post('Celebration/AddEvent', request, null)
	}
}
