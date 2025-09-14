export type SignUpRequest = {
    email: string,
    name: string,
    password: string,
}

export type SendMailRequest = {
    email: string,
}

export type SendMailResponse = {
    code: string,
}

export type VerifyMailReqeust = {
    email: string,
    code: string,
}