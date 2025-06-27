import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator"

export class CreateUserSubscriptionDto {

@IsUUID()
@IsNotEmpty()
plan_id: string

@IsDate()
@IsOptional()
start_date?: Date

@IsDate()
@IsOptional()
end_date?: Date

@IsBoolean()
auto_renew?: boolean


}
