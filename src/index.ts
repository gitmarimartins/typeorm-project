import "reflect-metadata"; // Necessário para o TypeORM
import { AppDataSource } from "./data-source";
import { AuthorService } from "./services/AuthorService";
import { BookService } from "./services/BookService";
import { MemberService } from "./services/MemberService";
import { LoanService } from "./services/LoanService";

const main = async () => {
    await AppDataSource.initialize();

    const authorService = new AuthorService();
    const bookService = new BookService();
    const memberService = new MemberService();
    const loanService = new LoanService();

    // Exemplo: criando um autor
    const author = await authorService.createAuthor("J.K. Rowling");
    console.log("Autor criado:", author);

    // Exemplo: criando um livro
    const book = await bookService.createBook("Harry Potter e a Pedra Filosofal", author.id);
    console.log("Livro criado:", book);

    // Exemplo: criando um membro
    const member = await memberService.createMember("Maria Silva", "123456");
    console.log("Membro criado:", member);

    // Exemplo: criando um empréstimo
    const loan = await loanService.createLoan(book, member);
    console.log("Empréstimo criado:", loan);

    // Obter todos os empréstimos ativos
    const activeLoans = await loanService.getActiveLoans();
    console.log("Empréstimos ativos:", activeLoans);
};

main().catch((error) => console.log("Erro: ", error));
