import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class ListUserService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = usersRepository.find();

    return classToPlain(users);
  }
}

export { ListUserService };
