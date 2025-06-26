import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Movie } from "./movies.model";

@Table({ tableName: 'favorites' })
export class Favorite extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({type:DataType.UUID,})
  user_id: string;

  @ForeignKey(() => Movie)
  @Column(DataType.UUID)
  movie_id: string;

  @BelongsTo(()=> Movie, {
    foreignKey: 'movie_id',
    onDelete: 'CASCADE' 
  })
  movie:Movie

  @BelongsTo(()=>User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'  
  })
  user:User
}