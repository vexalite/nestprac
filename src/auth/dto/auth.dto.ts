import { IsEmail,IsNotEmpty, IsString} from "class-validator"

export class AuthDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Value cannot be empty' })
    email: String;
    @IsString({ message: 'Value must be a string' })
    @IsNotEmpty({ message: 'Value cannot be empty' })
    password: String;
}