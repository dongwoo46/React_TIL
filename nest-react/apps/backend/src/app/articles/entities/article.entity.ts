import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  context: string;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  price: number;
}
