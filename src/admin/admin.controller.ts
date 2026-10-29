import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserService } from '../users/users.service';
import { ResponseMessage } from '../common/decorators/response_message.decorator';
import { ApiOkResponseData } from '../common/decorators/api-ok-response-data.decorator';
import { UserResponseDto } from '../users/dto/user-response.dto';

@ApiTags("Admin")
@ApiBearerAuth()
@Roles("admin")
@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {
  }

  @Get("users")
  @ApiOperation({summary: "List all users, admin only"})
  @ApiOkResponseData(UserResponseDto, { isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Delete("users/:id")
  @ApiOperation({summary: "Delete user, admin only"})
  @ResponseMessage("User was deleted successfully")
  remove(@Param("id", ParseIntPipe) id: number){
    return this.userService.remove(id)
  }
}
