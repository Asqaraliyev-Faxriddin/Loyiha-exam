import {Controller,Get,Post,Body,Param,Delete,UploadedFile,UseInterceptors,Req,UseGuards, Put,} from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { CreateMovieFileDto, paramdto } from './dto/create-movie_file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { UserRole } from 'src/core/types/user';
import { ApiTags, ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';

@ApiTags('Movie Files')
@ApiBearerAuth()
@Controller('api/movie-files')
export class MovieFilesController {
  constructor(private readonly movieFilesService: MovieFilesService) {}

  @Post('create')
  @UseGuards(AuthGuard, PermissionGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          const filename = uuidv4() + extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        movie_id: { type: 'string', format: 'uuid' },
        language: { type: 'string' },
        quality: {
          type: 'string',
          enum: ['LOW', 'MEDIUM', 'HIGH', 'ULTRA'],
        },
        file: { type: 'string', format: 'binary' },
      },
      required: ['movie_id', 'language', 'quality', 'file'],
    },
  })
  async create(
    @Body() dto: CreateMovieFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.movieFilesService.create(dto, file.filename);
  }

  @Get('all')
  @UseGuards(AuthGuard, )
  async findAll(@Req() req:Request) {
    return this.movieFilesService.findAll(req["user"].id, req["user"].role);
  }
  
  @Get('one/:id')
  @UseGuards(AuthGuard, )
  async findOne(@Param('id') id: string, @Req() req:Request) {
    return this.movieFilesService.findOne(id,req["user"].id, req["user"].role);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, PermissionGuard)
  remove(@Param('id') id: string) {
    return this.movieFilesService.remove(id);
  }


  @Put('update/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          const filename = uuidv4() + extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        movie_id: { type: 'string', format: 'uuid' },
        language: { type: 'string' },
        quality: {
          type: 'string',
          enum: ['LOW', 'MEDIUM', 'HIGH', 'ULTRA'],
        },
        file: { type: 'string', format: 'binary' },
      },
      required: ['movie_id', 'language', 'quality', 'file'],
    },
  })
  async update(
    @Body() dto: UpdateMovieFileDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req:Request,
    @Param("id") id:string
  ) {
    let userid = req["user"].id
    return this.movieFilesService.update(id,dto, file,userid);
  }

}
