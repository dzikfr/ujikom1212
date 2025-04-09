import { PoolClient } from "pg";

export class UserRepository {
  async createUser(name: string, email: string, client: PoolClient) {
    const result = await client.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  }

  async getUsers(client: PoolClient) {
    const result = await client.query("SELECT * FROM users");
    return result.rows;
  }

  async updateUser(id: number, name: string, email: string, client: PoolClient) {
    const result = await client.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    return result.rows[0];
  }

  async deleteUser(id: number, client: PoolClient) {
    const result = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findUserById(id: number, client: PoolClient) {
    const result = await client.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }
}
