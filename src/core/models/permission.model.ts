import { ForeignKey, BelongsTo, Table, Default, Column, DataType, PrimaryKey, Model } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'permissions' })
export class Permission extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id :string


  @ForeignKey(() => User)
  @Column({type:DataType.UUID, onDelete: "CASCADE"})
  user_id: string;



  @Column(DataType.BOOLEAN)
  write:boolean

  @Column(DataType.BOOLEAN)
  read:boolean

  @Column(DataType.BOOLEAN)
  updated:boolean

  @Column(DataType.BOOLEAN)
  delete:boolean


  @BelongsTo(() => User)
  user: User;



}