import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  description!: string;

  @Column('float')
  amount!: number;

  @Column()
  type!: 'credit' | 'debit';
}
