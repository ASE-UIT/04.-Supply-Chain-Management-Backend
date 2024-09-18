import { Auth_ChangePasswordDto } from '@gstb/dtos/Auth_ChangePasswordDto';
import { Auth_CreateUserDto } from '@gstb/dtos/Auth_CreateUserDto';
import { Auth_LoginDto } from '@gstb/dtos/Auth_LoginDto';
import { SystemRoleEnum } from '@gstb/enums/SystemRoleEnum';
import { Role } from '@gstb/guards/RoleDecorator';
import { RoleGuard } from '@gstb/guards/RoleGuard';
import { AuthService } from '@gstb/services/AuthService';
import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signin')
    @ApiOperation({ summary: 'Đăng nhập', description: 'Api đăng nhập người dùng' })
    async auth(@Req() req, @Res() res, @Body() userAuthDto: Auth_LoginDto) {
        return res.status(HttpStatus.OK).json(await this.authService.login(userAuthDto));
    }

    @Get('/callback')
    @ApiOperation({ summary: 'Callback', description: 'Api callback' })
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    async callback(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json({ msg: "ok", data: req.user });
    }

    @Post('/create-user')
    @ApiOperation({ summary: 'Tạo người dùng', description: 'Api tạo người dùng' })
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    @Role(SystemRoleEnum.ROLE_ADMIN)
    async register(@Req() req, @Res() res, @Body() userAuthDto: Auth_CreateUserDto) {
        return res.status(HttpStatus.OK).json(await this.authService.createUser(userAuthDto));
    }

    @Put('/update-password')
    @ApiOperation({ summary: 'Cập nhật mật khẩu', description: 'Api cập nhật mật khẩu người dùng' })
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    async update(@Req() req, @Res() res, @Body() userAuthDto: Auth_ChangePasswordDto) {
        return res.status(HttpStatus.OK).json(await this.authService.changePassword(req.user.id, userAuthDto.password));
    }
}