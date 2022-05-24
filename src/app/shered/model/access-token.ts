export class AccessToken {
    access_token!: string;
    token_type!: string;
    refresh_token!: string;
    expires_in!: string;
    scope!: string;

    constructor(accessToken: string,
        tokenType: string,
        refreshToken: string,
        expiresIn: string,
        scope: string) {

    this.access_token = accessToken;
    this.token_type = tokenType;
    this.refresh_token = refreshToken;
    this.expires_in = expiresIn;
    this.scope = scope;
    }
}

