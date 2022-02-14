import { Column } from 'typeorm';

export class BaseEntity {
  @Column()
  DEL_FLG: '0' | '1' | undefined;

  @Column()
  PG_NAME?: string;

  @Column()
  INSERT_DATE?: Date;

  @Column()
  UPDATE_DATE?: Date;

  @Column()
  INPUT_BUSHO_CODE?: string;

  @Column()
  INPUT_TANTO_CODE?: string;

  @Column()
  INPUT_TANTO_NAME?: string;

  // @Column()
  // created_at?: Date;

  // @Column({
  //   default: new Date(),
  // })
  // updated_at?: Date;

  // @BeforeUpdate()
  // updateUpdatedAt() {
  //   this.updated_at = new Date();
  // }

  // @BeforeInsert()
  // updateCreatedAt() {
  //   this.created_at = new Date();
  // }
}
