export interface JwtPayload {
  type: 'email_verification' | 'access' | 'refresh';
  userId: string;
}
