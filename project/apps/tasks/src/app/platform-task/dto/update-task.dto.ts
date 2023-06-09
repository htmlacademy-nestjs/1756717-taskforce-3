import { City, StatusTask } from '@project/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { PlatformTaskValidationMessage, TaskSetting } from '../platform-task.constant';
import { IsISO8601, IsString, Min, Length, ArrayMaxSize, IsEnum, IsOptional, Matches, IsInt} from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Клининг помещения'
  })
  @IsOptional()
  @IsString()
  @Length(TaskSetting.TitleMinLength, TaskSetting.TitleMaxLength, {message: PlatformTaskValidationMessage.TitleNotValid})
  public title?: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Выполнить клининг офисного помещения'
  })
  @IsOptional()
  @IsString()
  @Length(TaskSetting.DescriptionMinLength, TaskSetting.DescriptionMaxLength, {message: PlatformTaskValidationMessage.DescriptionNotValid})
  public description?: string;

  @ApiProperty({
    description: 'Category ID',
    example: 2
  })
  @IsOptional()
  @IsInt()
  public categoryId?: number;

  @ApiProperty({
    description: 'Task price',
    example: 1000
  })
  @IsOptional()
  @Min(TaskSetting.PriceMinValue, {message: PlatformTaskValidationMessage.PriceNotValid})
  public price?: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '2023-03-30'
  })
  @IsOptional()
  @IsISO8601({}, {message: PlatformTaskValidationMessage.DeadlineNotValid})
  public deadline?: Date;

  @ApiProperty({
    description: 'Task picture',
    example: '/img/img.png'
  })
  @IsOptional()
  @IsString()
  @Matches(/\.(jpe?g|png)$/i, {message: PlatformTaskValidationMessage.ImageNotValid})
  public image?: string;

  @ApiProperty({
    description: 'Address where task should be done',
    example: 'Санкт-Петербург, наб. реки Карповки, д.5 литера П'
  })
  @IsOptional()
  @Length(TaskSetting.AddressMinLength, TaskSetting.AddressMaxLength, {message: PlatformTaskValidationMessage.AddressNotValid})
  public address?: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['быстро', 'дешёво']
  })
  @IsOptional()
  @ArrayMaxSize(TaskSetting.TagsMaxAmount, {message: PlatformTaskValidationMessage.TagsAmountNotValid})
  @Length(TaskSetting.TagMinLength, TaskSetting.TagMaxLength, {each: true})
  @Matches(/^[a-zA-Z][a-zA-Z\d]*[^ ]$/, {each: true})
  public tags?: string[];

  @ApiProperty({
    description: 'Task city',
    example: 'Москва'
  })
  @IsOptional()
  @IsEnum(City, { message: PlatformTaskValidationMessage.CityNotValid })
  public city?: City;

  @ApiProperty({
    description: 'Task city',
    example: 'Москва'
  })
  @IsOptional()
  @IsEnum(StatusTask, { message: PlatformTaskValidationMessage.StatusNotValid })
  public status?: StatusTask;

  @ApiProperty({
    description: 'ExecutorId',
    example: ' 6457ccd22d75f5c87f8b7657'
  })
  @IsOptional()
  public executorId?: string;

  @ApiProperty({
    description: 'Show if the task has a response',
    example: true
  })
  @IsOptional()
  public hasResponse?: boolean;
}
