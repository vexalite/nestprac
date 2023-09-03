import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class AuthService {
    constructor (private prisma: PrismaService){}

    async signup(dto: AuthDto){
        //generate the password
        console.log(dto.password)
        const hash = await argon.hash(dto.password.toString());
        //save in db
        try{
        const user = await this.prisma.user.create({
            data:{
                email: dto.email as string,
                hash,
            },
            select: {
                id: true,
                email: true,
                createdAt: true
            }
        })
        return user;
    }catch(error){
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code === 'P2002' ){
                throw new ForbiddenException(
                    'Credentials taken'
                )
            }
        }
    }
    }

   async signin(dto: AuthDto){

    // find user by email
    const user = await this.prisma.user.findUnique({
        where: {
            email: dto.email as string,
        }
    })
    // if user does not exist 
    if(!user) throw new ForbiddenException(
        'Credentials Incorrect'
    )
    //compare passwords
    const matchPassword = await argon.verify(user.hash, dto.password as string)
    if(!matchPassword) throw new ForbiddenException(
        'Credentials Incorrect'
    )
        delete user.hash
        return user;
    }
}
