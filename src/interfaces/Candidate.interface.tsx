// TODO: Create an interface for the Candidate objects returned by the API
export interface User {
    readonly id: string;
    avatar_url: string;
    html: string;
}

export interface GithubUserResponse {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}