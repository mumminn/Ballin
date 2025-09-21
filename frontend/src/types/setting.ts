export type SocialType = "KAKAO" | "LOCAL";

export type UserResponse = {
    email: string;
    name: string;
    socialType: SocialType;
}

export type EditRequest = {
    email?: string | undefined;
    name?: string | undefined;
}

export type EditPasswordRequest = {
    currentPassword: string;
    newPassword: string;
}