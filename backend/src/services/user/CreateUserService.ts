import knex from '../../database/connection';

interface UserType {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  phone: string;
}

export default class CreateUserService {
  async exec(input: UserType): Promise<UserType> {
    const { cpf, email } = input;

    const user = await knex('users').where({ cpf }).orWhere({ email }).first();

    if (user) {
      throw new Error('Usuário com dados já existentes!');
    }

    const [userId] = await knex('users').insert(input);

    return await knex('users').where({ id: userId }).first();
  }
}
