import { Controller, Get, Post, Body, Delete, Param, UploadedFile, UseInterceptors, UnsupportedMediaTypeException, Query, UseGuards, Req, Put } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto, MovieQueryDto } from "./dto/create-movie.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import { Express } from "express";
import { UserRole } from "src/core/types/user";
import { AuthGuard } from "src/core/guards/jwt-guard";
import { PermissionGuard } from "src/core/guards/role-guard";
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ApiTags } from "@nestjs/swagger";
import { ApiConsumes } from "@nestjs/swagger";
import { ApiBody } from "@nestjs/swagger";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@ApiBearerAuth()
@ApiTags("Movies")
@Controller("api/movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post("create")
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, PermissionGuard)
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
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        poster: {
          type: "string",
          format: "binary"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        release_date: {
          type: "string",
          format: "date"
        },
        duration: {
          type: "number"
        },
        age_limit: {
          type: "string"
        },
        country: {
          type: "string"
        }
      },
      required: ["title", "description", "poster"]
    }
  })
  async create(@Body() createMovieDto: CreateMovieDto, @UploadedFile() poster: Express.Multer.File) {
    const poster_url = poster.filename;
    return this.moviesService.create(createMovieDto, poster_url);
  }

  @Get("all")
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, )
  findAll() {
    return this.moviesService.findAll();
  }

  @ApiExtraModels(MovieQueryDto)
  @ApiQuery({ name: 'query', type: MovieQueryDto })
  @Get("one/query")
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard,)
  findOne(@Query() payload: any) {
    return this.moviesService.findQueryAll(payload);
  }

  @Delete("delete/:id")
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard, PermissionGuard)
  remowe(@Param("id") id: string) {
    return this.moviesService.remove(id);
  }


  
  @Put("update/:id")
  @UseGuards(AuthGuard, PermissionGuard)
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
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        poster: {
          type: "string",
          format: "binary"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        release_date: {
          type: "string",
          format: "date"
        },
        duration: {
          type: "number"
        },
        age_limit: {
          type: "string"
        },
        country: {
          type: "string"
        }
      },
      required: ["title", "description", "poster"]
    }
  })
  async update(@Param("id") id:string,@Body() createMovieDto: UpdateMovieDto, @UploadedFile() poster: Express.Multer.File,@Req() req:Request) {
    const userid = req["user"].id
    return this.moviesService.update(id,createMovieDto,poster,userid);
  }

}
