import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';
import { WaterReminderDto } from './water-reminder.dto';

export class WaterReminderResponseDto extends WaterReminderDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.nextReminderAt.value,
    description: SWAGGER_EXAMPLES.nextReminderAt.description,
    nullable: true,
  })
  nextReminderAt: Date | null;
}
