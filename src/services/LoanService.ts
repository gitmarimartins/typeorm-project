import { AppDataSource } from "../data-source";
import { Loan } from "../entities/Loan";
import { Book } from "../entities/Book";
import { Member } from "../entities/Member";
import { IsNull } from "typeorm"; // Importando IsNull

export class LoanService {
    async createLoan(book: Book, member: Member): Promise<Loan> {
        const loan = new Loan();
        loan.book = book;
        loan.member = member;
        loan.loanDate = new Date();
        loan.returnDate = null; // Isso é válido
        return await AppDataSource.getRepository(Loan).save(loan);
    }

    async getAllLoans(): Promise<Loan[]> {
        return await AppDataSource.getRepository(Loan).find();
    }

    async getActiveLoans(): Promise<Loan[]> {
        return await AppDataSource.getRepository(Loan).find({
            where: { returnDate: IsNull() }, // Usando IsNull para buscar onde returnDate é null
        });
    }
}
