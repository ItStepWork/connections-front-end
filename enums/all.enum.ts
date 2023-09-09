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

export enum NotificationType {
    AddFriend = "AddFriend",
    RemoveFriend = "RemoveFriend",
    ConfirmFriend = "ConfirmFriend",
    CancelFriend = "CancelFriend",
    RefusedFriend = "RefusedFriend",
    BirthDay = "BirthDay",
    InviteToGroup = "InviteToGroup",
    LikePhoto = "LikePhoto",
    CommentPhoto= "CommentPhoto",
}

export enum Gender {
    NotSelected = "NotSelected",
    Male = "Male",
    Female = "Female",
}