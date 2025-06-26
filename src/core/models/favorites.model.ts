import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Movie } from "./movies.model";

@Table({ tableName: 'favorites' })
export class Favorite extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({type:DataType.UUID,onDelete: 'CASCADE'})
  declare id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @ForeignKey(() => Movie)
  @Column(DataType.UUID)
  movie_id: string;

  @BelongsTo(()=>Movie)
  movie:Movie

  @BelongsTo(()=>User)
  user:User
}