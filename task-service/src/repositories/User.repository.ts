import { Repository } from "typeorm";
import { AppDataSource } from "../config/Db.config";
import { User } from "../entities/User.entity";
import { CreateUserDTO } from "../dto/User.dto";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(user: CreateUserDTO): Promise<User> {
    const _user = this.repository.create(user);
    return await this.repository.save(_user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async updateUser(id: number, username: string, email: string, isActive: boolean): Promise<User | null> {
    await this.repository.update(id, { username, email, is_active: isActive });
    return this.repository.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }

}
