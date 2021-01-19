import jwt from 'jwt-simple';

interface UserType {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

interface InfoType {
  sub: string;
  iat: string;
  user: UserType;
}

export function Encode(user: UserType): string {
  const userInfo = {
    sub: user.id,
    iat: Date.now(),
    user,
  };

  const token = jwt.encode(userInfo, process.env.JWT_KEY || 'teste');

  return token;
}

export function Decode(token: string): InfoType {
  return jwt.decode(token, process.env.JWT_KEY || 'teste');
}
