import { Body, Controller, Get, HttpCode, HttpStatus, Request, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Public } from "./constants";

interface ISignIn {
    username: string;
    password: string;
}
@Controller("auth")
export class AuthController {

    constructor ( private authService: AuthService ){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signDto: ISignIn) {
        console.log(signDto)
        return this.authService.signIn(signDto.username, signDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}