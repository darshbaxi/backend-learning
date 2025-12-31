export interface AuthTokensResponse {
  access: TokenResponse
  refresh?: TokenResponse
}