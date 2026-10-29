import { OmitType } from '@nestjs/swagger';
import { GetAllIntakesDto } from './get-all-intakes.dto';

export class GetTodaysIntakesDto extends OmitType(GetAllIntakesDto, ['from', 'to'] as const) {}
