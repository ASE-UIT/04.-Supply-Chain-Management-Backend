import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  // Cột type
  @Column()
  type: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;
}
