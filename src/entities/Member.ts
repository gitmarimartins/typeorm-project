import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Loan } from "./Loan";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    membershipNumber!: string;

    @OneToMany(() => Loan, (loan) => loan.member)
    loans!: Loan[];
}
