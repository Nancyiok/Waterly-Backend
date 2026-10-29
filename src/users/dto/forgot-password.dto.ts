import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SWAGGER_EXAMPLES } from "../../common/constants/swagger-examples";

export class ForgotPasswordDto {
    @ApiProperty({example: SWAGGER_EXAMPLES.email.value})
    @IsEmail()
    email: string
}