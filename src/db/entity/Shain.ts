import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './Base';

@Entity()
export class M_SHAIN extends BaseEntity {
  @PrimaryGeneratedColumn()
  SHAIN_CODE!: string;

  @Column()
  SHAIN_KANA!: string;

  @Column()
  SHAIN_NAME!: string;

  @Column()
  BUSHO_KBN!: string;

  @Column()
  EIGYOMAN_KBN!: string;

  @Column()
  BUSHO_CODE!: string;

  @Column()
  TAISHOKU_KBN!: string;

  @Column()
  TAISHOKUBI?: string;
}
