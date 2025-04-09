import { UserBodyInput, UserParamsInput } from "./user.schema";
import { UserRepository } from "./user.repository";
import { pool } from "../../config/database";

export class UserService {
  private userRepo = new UserRepository();

  async createUser(input: UserBodyInput) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const user = await this.userRepo.createUser(
        input.name,
        input.email,
        client
      );
      
      await client.query("COMMIT");
      return user;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async getUsers() {
    const client = await pool.connect();
    try {
      const users = await this.userRepo.getUsers(client);
      return users;
    } finally {
      client.release();
    }
  }

  async updateUser(input: UserParamsInput, body: UserBodyInput) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const checkingUser = await this.userRepo.findUserById(input.id, client);
      if (!checkingUser) throw new Error("User not found");

      const user = await this.userRepo.updateUser(
        input.id,
        body.name,
        body.email,
        client
      );

      await client.query("COMMIT");
      return user;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async deleteUser(input: UserParamsInput) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const checkingUser = await this.userRepo.findUserById(input.id, client);
      if (!checkingUser) throw new Error("User not found");

      const user = await this.userRepo.deleteUser(input.id, client);
      await client.query("COMMIT");
      return user;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}
