export interface IUser {
  id: string
  role: string
  status: number
  lastVisit: string
  firstName: string
  lastName: string
  gender: number
  phone: string
  familyStatus: string
  accessToken: string
  born: string
  aboutMe: string
  email: string
}
export const getUser = (token: string, user: IUser) => {
  user.accessToken = token
  return user
}