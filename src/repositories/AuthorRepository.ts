import { Repository } from "typeorm";
import { Author } from "../entities/Author";

export class AuthorRepository extends Repository<Author> {
    async findById(id: number): Promise<Author | undefined> {
        const author = await this.findOne({ where: { id } });
        return author ?? undefined; // Retorna undefined se author for null
    }

    async findByName(name: string): Promise<Author | undefined> {
        const author = await this.findOne({ where: { name } });
        return author ?? undefined; // Retorna undefined se author for null
    }

    async createAuthor(authorData: Partial<Author>): Promise<Author> {
        const author = this.create(authorData);
        return this.save(author);
    }

    async updateAuthor(id: number, authorData: Partial<Author>): Promise<Author | null> {
        const author = await this.findOne({ where: { id } });
        if (!author) {
            return null; // Retorna null se o autor não for encontrado
        }
        Object.assign(author, authorData);
        return this.save(author);
    }

    async deleteAuthor(id: number): Promise<boolean> {
        const result = await this.delete(id);
        return result.affected !== 0; // Retorna true se o autor foi deletado
    }
}
