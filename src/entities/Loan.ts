import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Book } from "./Book";
import { Member } from "./Member";

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Book, (book) => book.loans)
    @JoinColumn({ name: "bookId" }) // Se você tiver um nome de coluna específico
    book!: Book;

    @ManyToOne(() => Member, (member) => member.loans)
    @JoinColumn({ name: "memberId" }) // Se você tiver um nome de coluna específico
    member!: Member;

    @Column()
    loanDate!: Date;

    @Column({ nullable: true })
    returnDate?: Date | null; // Aqui definimos como `Date | null` para que possa ser nulo
}
