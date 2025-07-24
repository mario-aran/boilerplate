export interface JwtPayload {
  tokenType: 'email_verification' | 'access' | 'refresh';
  userId: string;
}
