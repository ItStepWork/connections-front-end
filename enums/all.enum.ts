export enum FriendStatus {
    Confirmed = "Confirmed",
    Unconfirmed = "Unconfirmed",
    Waiting = "Waiting",
    Other = "Other",
}

export enum ComponentName {
    AboutMe,
    Groups,
    Connections,
    Gallery,
    Notifications,
    Celebration,
    Posts,
}

export enum AdminComponentName {
    Users,
    Genders,
    Zodiacs,
    PagesActivity,
    UsersActivity,
    Map,
    AllCharts,
}

export enum NotificationType {
    AddFriend = "AddFriend",
    RemoveFriend = "RemoveFriend",
    ConfirmFriend = "ConfirmFriend",
    CancelFriend = "CancelFriend",
    RefusedFriend = "RefusedFriend",
    BirthDay = "BirthDay",
    InviteToGroup = "InviteToGroup",
    LikePhoto = "LikePhoto",
    CommentPhoto = "CommentPhoto",
}

export enum Gender {
    NotSelected = "NotSelected",
    Male = "Male",
    Female = "Female",
}

export enum Page {
    Contacts = "Contacts",
    Messaging = "Messaging",
    Gallery = "Gallery",
    Notifications = "Notifications",
    Groups = "Groups",
    Authorization = "Authorization",
}

export enum Chart {
    Daily = "Daily",
    Hourly = "Hourly",
}

export enum Status {
    Active = "Active",
    Deleted = "Deleted",
}

export enum Role {
    User = "User",
    Moderator = "Moderator",
    Admin = "Admin",
}

