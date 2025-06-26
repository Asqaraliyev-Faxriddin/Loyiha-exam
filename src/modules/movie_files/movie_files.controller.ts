import {Controller,Get,Post,Body,Patch,Param,Delete,UploadedFile,UseInterceptors, Put,} from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { CreateMovieFileDto } from './dto/create-movie_file.dto';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('api/movie-files')
export class MovieFilesController {
  constructor(private readonly movieFilesService: MovieFilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          let filename = uuidv4()+ extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  async create(@Body() createMovieFileDto: CreateMovieFileDto,@UploadedFile() file: Express.Multer.File,) {
    let filename = file.filename;

    return this.movieFilesService.create(createMovieFileDto, filename);
  }

  @Get('all')
  findAll() {
    return this.movieFilesService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.movieFilesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieFileDto: UpdateMovieFileDto) {
    return this.movieFilesService.update(id, updateMovieFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieFilesService.remove(id);
  }
}
