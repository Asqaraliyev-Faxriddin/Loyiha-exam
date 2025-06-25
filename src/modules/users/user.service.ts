import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/core/models/user.model';
import { Profile } from 'src/core/models/profiles.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { Favorite } from 'src/core/models/favorites.model';
import { Review } from 'src/core/models/reviews.model';
import { WatchHistory } from 'src/core/models/watch_history.model';
import { Movie } from 'src/core/models/movies.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private usermodel: typeof User) {}

    async findAll() {
        const data = await this.usermodel.findAll({
         
            include: [
                {
                    model: Profile,

                },
                {
                    model: UserSubscription,
                },
                {
                    model: Favorite,
                    include: [Movie], 
                },
                {
                    model: Review,
                    include: [Movie], 
                },
                {
                    model: WatchHistory,
                    include: [Movie], 
                },
            ],
        });
        return data;
    }
}
