import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new HttpException('Authorization header missing', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.validateToken(authHeader);
        request.user = user;  // Gắn thông tin user đã xác thực vào request để sử dụng trong các controller
        
        return true;
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException("Invalid token format", HttpStatus.FORBIDDEN);
        }

        const token = auth.split(' ')[1];

        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET'), // Sử dụng biến môi trường để lấy secret key
            });
            return decoded;
        } catch (err) {
            throw new HttpException("Invalid token", HttpStatus.FORBIDDEN);
        }
    }
}
