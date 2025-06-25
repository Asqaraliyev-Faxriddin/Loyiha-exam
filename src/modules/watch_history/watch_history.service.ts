import { Injectable } from '@nestjs/common';
import { CreateWatchHistoryDto } from './dto/create-watch_history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch_history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WatchHistory } from 'src/core/models/watch_history.model';
import { User } from 'src/core/models/user.model';
import { Movie } from 'src/core/models/movies.model';

@Injectable()
export class WatchHistoryService {
  constructor(@InjectModel(WatchHistory) private watchHistory: typeof WatchHistory){}
  create(createWatchHistoryDto: CreateWatchHistoryDto) {
    return 'This action adds a new watchHistory';
  }

  async findAll() {
    let data = this.watchHistory.findAll({
      include:[
        {
          model:User
        },
        {
          model:Movie
        }
      ]
    })


    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} watchHistory`;
  }

  update(id: number, updateWatchHistoryDto: UpdateWatchHistoryDto) {
    return `This action updates a #${id} watchHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} watchHistory`;
  }
}
