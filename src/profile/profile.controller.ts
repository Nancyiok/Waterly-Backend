import { PROFILE_SUMMARIES } from '../common/constants/swagger-summaries/profile.constants';
import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiOkResponseData } from '../common/decorators/api-ok-response-data.decorator';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: PROFILE_SUMMARIES.FIND_ONE })
  @ApiOkResponseData(ProfileResponseDto)
  getProfile(@CurrentUser() user: any) {
    return this.profileService.findOne(user.id);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: PROFILE_SUMMARIES.UPDATE })
  update(@CurrentUser() user: any, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(user.id, updateProfileDto);
  }
}
