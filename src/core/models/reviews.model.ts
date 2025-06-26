import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Movie } from "./movies.model";

@Table({ tableName: 'reviews' })
export class Review extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
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

  @BelongsTo(()=>User,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
  })
  users:User

  @BelongsTo(()=>Movie, {
    foreignKey: "movie_id",
    onDelete: "CASCADE"
  })
  movies:Movie

}