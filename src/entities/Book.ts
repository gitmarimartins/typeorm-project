import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Author } from "./Author";
import { Loan } from "./Loan";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @ManyToOne(() => Author, (author) => author.books)
    author!: Author; // Aqui você tem uma referência à entidade Author

    @OneToMany(() => Loan, (loan) => loan.book)
    loans!: Loan[];
}
