import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { Author } from "./entities/Author";
import { Member } from "./entities/Member";
import { Loan } from "./entities/Loan";

export const AppDataSource = new DataSource({
    type: "mysql", // Tipo do banco de dados
    host: "localhost", // Endereço do banco de dados
    port: 3306, // Porta do MySQL (padrão)
    username: "seu_usuario", // Seu usuário do MySQL
    password: "sua_senha", // Sua senha do MySQL
    database: "library", // Nome do seu banco de dados
    synchronize: true, // Sincronizar as entidades com o banco de dados
    logging: false,
    entities: [Book, Author, Member, Loan],
});
