import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";

export class BookService {
    private bookRepository = AppDataSource.getRepository(Book);

    async createBook(title: string, authorId: number): Promise<Book> {
        const author = await AppDataSource.getRepository(Author).findOne({ where: { id: authorId } });
        if (!author) {
            throw new Error("Author not found");
        }

        const book = new Book();
        book.title = title;
        book.author = author; // Associa o livro ao autor
        return await this.bookRepository.save(book);
    }

    async getAllBooks(): Promise<Book[]> {
        return await this.bookRepository.find({ relations: ["author", "loans"] });
    }

    async getBookById(id: number): Promise<Book | null> {
        return await this.bookRepository.findOne({ where: { id }, relations: ["author", "loans"] });
    }

    async updateBook(id: number, title: string, authorId: number): Promise<Book | null> {
        const author = await AppDataSource.getRepository(Author).findOne({ where: { id: authorId } });
        if (!author) {
            throw new Error("Author not found");
        }

        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) {
            throw new Error("Book not found");
        }

        book.title = title;
        book.author = author; // Atualiza a associação com o autor
        return await this.bookRepository.save(book);
    }

    async deleteBook(id: number): Promise<void> {
        await this.bookRepository.delete(id);
    }
}
