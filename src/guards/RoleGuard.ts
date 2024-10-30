import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { CanActivate, ExecutionContext, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {
	}

	canActivate(context: ExecutionContext): boolean {
		const role = this.reflector.get<string>('role', context.getHandler());
		if (!role) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const hasRole = () => user.role === role;
		if (user && user.role && hasRole()) {
			return true;
		}
		Logger.warn('User ' + user.username + ' need ' + role + ' permission to access ' + request.originalUrl, null, false);
		throw new ApplicationException(HttpStatus.FORBIDDEN, MessageCode.USER_NOT_HAVE_PERMISSION);
	}
}