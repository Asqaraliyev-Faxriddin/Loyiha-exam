import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UnsupportedMediaTypeException } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import { Express } from "express";

@Controller("api/movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post("create")
  @UseInterceptors(
    FileInterceptor("poster", {
      storage: diskStorage({
        destination: "./uploads/posters",
        filename: (req, file, cb) => {
          const postername = uuidv4() + extname(file.originalname);
          cb(null, postername);
        }
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        // @ts-ignore
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new UnsupportedMediaTypeException("type jpeg, jpg yoki png bo'lishi kerak"),
            false
          );
        }
        cb(null, true);
      }
    })
  )
  async create(@Body() createMovieDto: CreateMovieDto,@UploadedFile() poster: Express.Multer.File
  ) {
    const poster_url = poster.filename;
    return this.moviesService.create(createMovieDto, poster_url);
  }

  @Get("all")
  findAll() {
    return this.moviesService.findAll();
  }

  @Delete("delete/:id")
  remowe(@Param("id") id:string) {
    return this.moviesService.remove(id);
  }
  

}
