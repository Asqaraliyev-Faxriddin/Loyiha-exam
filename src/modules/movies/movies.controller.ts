import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UnsupportedMediaTypeException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { extname } from 'path';

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post("create")
  @UseInterceptors(FileInterceptor("poster",{
    storage:diskStorage({
      destination:"./uploads/posters",
      filename:(req,file,cb)=>{
        let postername = v4()+extname(file.originalname)
        cb(null,postername) 
      }
    }),
    fileFilter:(req,file,funck)=>{
      let accessfileType:string[] = ["image/jpeg","image/jpg","image/png"]
      // @ts-ignore
      if(!accessfileType.includes(file.mimetype)) return funck(new UnsupportedMediaTypeException("poster_url type jpeg or jpg or png required"),false)
 
        funck(null,true)
    }
    
  }))
  create(@UploadedFile() poster:Express.Multer.File) {

  }

  @Get("all")
  findAll() {
    return this.moviesService.findAll();
  }


}
