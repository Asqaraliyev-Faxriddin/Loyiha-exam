import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Movie } from "./movies.model";

@Table({ tableName: 'reviews' })
export class Review extends Model {
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

  @Column(DataType.INTEGER)
  rating: number;

  @Column(DataType.TEXT)
  comment: string;

  @BelongsTo(()=>User)
  users:User

  @BelongsTo(()=>Movie)
  movies:Movie

}