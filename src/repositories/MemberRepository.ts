import { Repository } from "typeorm";
import { Member } from "../entities/Member";

export class MemberRepository extends Repository<Member> {
    async findById(id: number): Promise<Member | undefined> {
        const member = await this.findOne({ where: { id } });
        return member ?? undefined; // Retorna undefined se member for null
    }

    async findByMembershipNumber(membershipNumber: string): Promise<Member | undefined> {
        const member = await this.findOne({ where: { membershipNumber } });
        return member ?? undefined; // Retorna undefined se member for null
    }

    async createMember(memberData: Partial<Member>): Promise<Member> {
        const member = this.create(memberData);
        return this.save(member);
    }

    async updateMember(id: number, memberData: Partial<Member>): Promise<Member | null> {
        const member = await this.findOne({ where: { id } });
        if (!member) {
            return null; // Retorna null se o membro não for encontrado
        }
        Object.assign(member, memberData);
        return this.save(member);
    }

    async deleteMember(id: number): Promise<boolean> {
        const result = await this.delete(id);
        return result.affected !== 0; // Retorna true se o membro foi deletado
    }
}
