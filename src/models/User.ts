import { Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm";


@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email:string;

    @Column()
    password: string;

    @Column()
    lastPassword: string;

    @Column()
    confirmCode: string;

    @Column()
    forgotPassword: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;