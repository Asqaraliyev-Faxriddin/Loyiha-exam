import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Movie } from "./movies.model";

@Table({ tableName: 'watch_history' })
export class WatchHistory extends Model {
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
  watched_duration: number;

  @Column(DataType.DECIMAL(5, 2))
  watched_percentage: number;

  @Default(DataType.NOW)
  @Column({ field: 'last_watched', type: DataType.DATE })
  last_watched: Date;

  @BelongsTo(()=> User,{
    foreignKey:"user_id",
    onDelete:"CASCADE"
  })
  users:User

  @BelongsTo(()=> Movie,{
    foreignKey:"movie_id",
    onDelete:"CASCADE"
  })
  movies:Movie
}
