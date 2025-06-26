import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import {subscriptionType } from "../types/user";
import { MovieFile } from "./movie_files.model";
import { Review } from "./reviews.model";
import { MovieCategory } from "./movie_categories.model";

@Table({ tableName: 'movies' })
export class Movie extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column(DataType.STRING)
  title: string;

  @Column({ type: DataType.STRING, unique: true })
  slug: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.INTEGER)
  release_year: number;

  @Column(DataType.INTEGER)
  duration_minutes: number;

  @Column(DataType.STRING)
  poster_url: string;

  @Column(DataType.DECIMAL(3, 1))
  rating: number;

  @Default('free')
  //@ts-ignore
  @Column({type:DataType.ENUM(...Object.values(subscriptionType))})
  subscription_type: string;

  @Default(0)
  @Column(DataType.INTEGER)
  view_count: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  created_by: string;

  @HasMany(() => MovieCategory, {
    foreignKey: 'movie_id',
    onDelete: 'CASCADE',
  })
  movie_categories: MovieCategory[];

  @HasMany(() => MovieFile, {
    foreignKey: 'movie_id',
    onDelete: 'CASCADE',
  })
  movie_files: MovieFile[];

  @HasMany(() => Review, {
    foreignKey: 'movie_id',
    onDelete: 'CASCADE',
  })
  reviews: Review[];

  @BelongsTo(()=>User, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE'
  })
  users:User



}
