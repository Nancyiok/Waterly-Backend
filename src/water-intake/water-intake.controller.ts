import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WaterIntakeService } from './water-intake.service';
import { CreateWaterIntakeDto } from './dto/create-water-intake.dto';
import { UpdateWaterIntakeDto } from './dto/update-water-intake.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { WATER_INTAKE_SUMMARIES } from '../common/constants/swagger-summaries/water-intake.constants';
import { GetAllIntakesDto } from './dto/get-all-intakes.dto';
import { GetTodaysIntakesDto } from './dto/get-todays-intakes.dto';
import { Query } from '@nestjs/common';
import { Paginated } from '../common/decorators/pagination.decorator';
import { ApiOkResponseData } from '../common/decorators/api-ok-response-data.decorator';
import { WaterIntakeResponseDto } from './dto/water-intake-response.dto';
import { WaterIntakeTotalDto } from './dto/water-intake-total.dto';

@ApiTags('Water intake')
@ApiBearerAuth()
@Controller('water-intake')
export class WaterIntakeController {
  constructor(private readonly waterIntakeService: WaterIntakeService) {}
  @Post()
  @ApiOperation({ summary: WATER_INTAKE_SUMMARIES.CREATE })
  create( @CurrentUser() user: User, @Body() createWaterIntakeDto: CreateWaterIntakeDto) {
    return this.waterIntakeService.create(user, createWaterIntakeDto);
  }

  @Paginated()
  @Get()
  @ApiOperation({ summary: WATER_INTAKE_SUMMARIES.FIND_ALL })
  @ApiOkResponseData(WaterIntakeResponseDto, {
    paginated: true,
    meta: WaterIntakeTotalDto,
  })
  findAll(@CurrentUser() user: User, @Query() query: GetAllIntakesDto) {
    return this.waterIntakeService.findAll(user.id, query);
  }

  @Paginated()
  @Get('today')
  @ApiOperation({ summary: WATER_INTAKE_SUMMARIES.FIND_TODAYS_LOGS })
  @ApiOkResponseData(WaterIntakeResponseDto, {
    paginated: true,
    meta: WaterIntakeTotalDto,
  })
  findTodaysLogs(@CurrentUser() user: User, @Query() query: GetTodaysIntakesDto) {
    return this.waterIntakeService.findTodaysLogs(user.id, query);
  }

  @Patch(':id')
  @ApiOperation({ summary: WATER_INTAKE_SUMMARIES.UPDATE })
  update(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWaterIntakeDto: UpdateWaterIntakeDto,
  ) {
    return this.waterIntakeService.update(user.id, id, updateWaterIntakeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: WATER_INTAKE_SUMMARIES.REMOVE })
  remove(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.waterIntakeService.remove(user.id, id);
  }
}
