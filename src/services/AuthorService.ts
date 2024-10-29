import { Author } from "../entities/Author";
import { AppDataSource } from "../data-source";

export class AuthorService {
    static async createAuthor(name: string): Promise<Author> {
        const author = AppDataSource.getRepository(Author).create({ name });
        return await AppDataSource.getRepository(Author).save(author);
    }

    static async getAllAuthors(): Promise<Author[]> {
        return await AppDataSource.getRepository(Author).find({ relations: ["books"] });
    }

    static async getAuthorById(authorId: number): Promise<Author | null> {
        return await AppDataSource.getRepository(Author).findOne({
            where: { id: authorId },
            relations: ["books"],
        });
    }

    static async deleteAuthor(authorId: number): Promise<void> {
        await AppDataSource.getRepository(Author).delete({ id: authorId });
    }
}
