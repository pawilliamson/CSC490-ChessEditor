import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userID!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    emailAddress!: string;

}