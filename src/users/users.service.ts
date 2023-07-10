import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import axios from 'axios';
import * as fs from 'fs'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async createUser(): Promise<void> {
        const response = await axios.post('https://reqres.in/api/users'); // requisição para o reqres

        const user = new this.userModel({ userId: response.data.id }); // Salva usuário no DB
        await user.save();

        this.sendEmail();

        this.sendRabbitMQEvent();

    }

    async getUser(userId: string): Promise<any> { // requisição para https://reqres.in/api/users/{userId}
        const response = await axios.get(`https://reqres.in/api/users/${userId}`);
        return response.data;

    }

    async getAvatar(userId: string): Promise<string> {
        const user = await this.userModel.findOne({ userId }).exec();
        if (user && user.avatar) { // retorna o avatar se estiver salvo no DB
            return user.avatar;
        }

        const response = await axios.get('`https://reqres.in/api/users/${userId}/avatar`'); // requisição para pegar o avatar
        const avatarFile = `avatars/${userId}.png`;
        fs.writeFileSync(avatarFile, response.data);

        user.avatar = avatarFile; 
        await user.save() // salvar no DB

        const avatarB64 = fs.readFileSync(avatarFile, { encoding: 'base64' });
        return avatarB64;

    }

    async deleteAvatar(userId: string): Promise<void> {
        const user = await this.userModel.findOne({ userId }).exec();
        if (user && user.avatar) {
            fs.unlinkSync(user.avatar);

            user.avatar = undefined;
            await user.save()
        }
    }

    sendEmail(): void {
        console.log('Enviando email')
    }

    sendRabbitMQEvent(): void {
        console.log('Enviando evento')
    }
}