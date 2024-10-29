import { Repository } from "typeorm";
import { Loan } from "../entities/Loan";
import { Member } from "../entities/Member";
import { IsNull } from "typeorm";

export class LoanRepository extends Repository<Loan> {
    async findActiveLoans(): Promise<Loan[]> {
        return this.find({ where: { returnDate: IsNull() } });
    }

    async addLoan(loan: Partial<Loan>): Promise<Loan> {
        const newLoan = this.create(loan);
        return this.save(newLoan);
    }

    async findLoansByMember(memberId: number): Promise<Loan[]> {
        return this.createQueryBuilder("loan")
            .leftJoinAndSelect("loan.member", "member")
            .where("member.id = :memberId", { memberId })
            .getMany();
    }
}
