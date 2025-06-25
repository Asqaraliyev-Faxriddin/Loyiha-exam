import { ForeignKey, BelongsTo, Table, Default, Column, DataType, PrimaryKey, Model } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'profiles' })
export class Profile extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.STRING)
  full_name: string;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.STRING)
  country: string;

  @BelongsTo(()=>User)
  users:User

}