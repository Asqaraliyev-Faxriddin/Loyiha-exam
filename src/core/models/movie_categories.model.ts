import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Category } from "./categories.model";
import { Movie } from "./movies.model";

@Table({ tableName: 'movie_categories' })
export class MovieCategory extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Movie)
  @Column(DataType.UUID)
  movie_id: string;

  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  category_id: string;

  @BelongsTo(()=> Movie)
  movie:Movie

  @BelongsTo(()=> Category)
  category:Category
}