import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    createUser(): void {
        this.usersService.createUser()
    }

    @Get(':userId')
    getUser(@Param('userId') userId: string): Promise<any> {
        return this.usersService.getUser(userId);
    }

    @Get(':userId/avatar')
    getAvatar(@Param('userId') userId: string): Promise<string> {
        return this.usersService.getAvatar(userId);
    }

    @Delete('userId/avatar')
    deleteAvatar(@Param('userId') userId: string): Promise<void> {
        return this.usersService.deleteAvatar(userId);
    }
}