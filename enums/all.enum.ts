export enum FriendStatus {
	Confirmed = 'Confirmed',
	Unconfirmed = 'Unconfirmed',
	Waiting = 'Waiting',
	Other = 'Other',
}

export enum ComponentName {
	AboutMe,
	Groups,
	Connections,
	Gallery,
	Notifications,
	Celebration,
	Posts,
	Photos,
	Albums,
	Stories,
	Requests,
	Members,
	AboutGroup,
	News
}

export enum AdminComponentName {
	Users,
	Groups,
	Genders,
	Zodiacs,
	PagesActivity,
	UsersActivity,
	Map,
	AllCharts,
	Messages,
	Complaints,
}

export enum NotificationType {
	AddFriend = 'AddFriend',
	RemoveFriend = 'RemoveFriend',
	ConfirmFriend = 'ConfirmFriend',
	CancelFriend = 'CancelFriend',
	RefusedFriend = 'RefusedFriend',
	BirthDay = 'BirthDay',
	InviteToGroup = 'InviteToGroup',
	LikePhoto = 'LikePhoto',
	CommentPhoto = 'CommentPhoto',
}

export enum Gender {
	NotSelected = 'NotSelected',
	Male = 'Male',
	Female = 'Female',
}

export enum Page {
	Contacts = 'Contacts',
	Messaging = 'Messaging',
	Gallery = 'Gallery',
	Notifications = 'Notifications',
	Groups = 'Groups',
	Authorization = 'Authorization',
}

export enum Chart {
	Daily = 'Daily',
	Hourly = 'Hourly',
}

export enum Status {
	Active = 'Active',
	Deleted = 'Deleted',
}

export enum Role {
	User = 'User',
	Moderator = 'Moderator',
	Admin = 'Admin',
}

export enum EventType {
	Meeting = 'Meeting',
	Celebration = 'Celebration',
	BirthDay = 'BirthDay',
}

export enum MessageStatus {
	Unread = 'Unread',
	Read = 'Read',
}

export enum FileFormats {
	Jpg = '.jpg',
	Jpeg = '.jpeg',
	Svg = '.svg',
	Gif = '.gif',
	Webp = '.webp',
	Avif = '.avif',
	Png = '.png',
	All = '.jpg, .jpeg, .png, .gif, .avif, .webp, .svg',
}

export enum NewsCategory {
	Sports = "Sports",
	Science = "Science",
	Health = "Health",
	Movies  = "Movies",
	Media = "Media",
	Food = "Food",
	Fashion = "Fashion",
	Energy = "Energy",
	Education = "Education",
	Culture = "Culture",
	Cars = "Cars",
	Books = "Books",
	Arts = "Arts",
	National = "National",
	Politics = "Politics",
	Technology = "Technology",
	Travel = "Travel",
	Weather = "Weather",
	World = "World",
	Working = "Working",
	Universal = "Universal",
	Regionals = "Regionals",
	Magazine = "Magazine",
}