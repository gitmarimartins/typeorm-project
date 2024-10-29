import { Repository } from "typeorm";
import { Book } from "../entities/Book";

export class BookRepository extends Repository<Book> {
    async findById(id: number): Promise<Book | undefined> {
        const book = await this.findOne({ where: { id } });
        return book ?? undefined; // Retorna undefined se book for null
    }

    async findByTitle(title: string): Promise<Book | undefined> {
        const book = await this.findOne({ where: { title } });
        return book ?? undefined; // Retorna undefined se book for null
    }

    async createBook(bookData: Partial<Book>): Promise<Book> {
        const book = this.create(bookData);
        return this.save(book);
    }

    async updateBook(id: number, bookData: Partial<Book>): Promise<Book | null> {
        const book = await this.findOne({ where: { id } });
        if (!book) {
            return null; // Retorna null se o livro não for encontrado
        }
        Object.assign(book, bookData);
        return this.save(book);
    }

    async deleteBook(id: number): Promise<boolean> {
        const result = await this.delete(id);
        return result.affected !== 0; // Retorna true se o livro foi deletado
    }
}
