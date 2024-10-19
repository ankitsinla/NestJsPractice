import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import VariablesConstant from "@utils/constants/variable-constants/variable-constants.service";
import { ResponseData } from "@utils/enum/response";

import { Response } from "express";
import { LoggerDto } from "src/logger/logger.dto";
import { AppLoggerService } from "src/logger/logger.service";

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
	constructor(private appLoggerService: AppLoggerService) {}

	async catch(exception: any, host: ArgumentsHost) {
		const context = host.switchToHttp();
		if (exception.constructor?.name === HttpException.name) {
			return await this.handleHttpException(exception, context);
		} else {
			return await this.handleCommonError(exception, context);
		}
	}

	private async handleHttpException(exception: any, context: HttpArgumentsHost) {
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();
		try {
			const res = exception.getResponse();
			const appLoggerDto: LoggerDto = new LoggerDto(
				VariablesConstant.ERROR,
				"error_catch_in_commonexception_filter",
				"UtilsModule",
				"CommonExceptionFilter",
				"catch",
				exception
			);
			appLoggerDto.addMethodAndRequest("", request);
			this.appLoggerService.writeLog(appLoggerDto);
			if (res?.status) {
				return response.status(200).send({
					errorCode:
						res?.status?.errorCode === 0
							? res?.status?.errorCode
							: res?.status?.errorCode || ResponseData.UNKNOWN_ERROR_OCCURRED["errorCode"],
					errorMessage: res?.status?.errorMessage || ResponseData.UNKNOWN_ERROR_OCCURRED["errorMessage"],
					data: res?.data || {}
				});
			} else {
				return response.status(200).send(res);
			}
		} catch (e) {
			const appLoggerDto: LoggerDto = new LoggerDto(
				VariablesConstant.ERROR,
				"error_catch_in_commonexception_filter",
				"UtilsModule",
				"CommonExceptionFilter",
				"catch",
				exception
			);
			appLoggerDto.addMethodAndRequest("", request);
			this.appLoggerService.writeLog(appLoggerDto);
			response.status(200).send({
				errorCode: ResponseData.UNKNOWN_ERROR_OCCURRED["errorCode"],
				errorMessage: ResponseData.UNKNOWN_ERROR_OCCURRED["errorMessage"],
				data: {}
			});
		}
	}

	private async handleCommonError(exception: any, context: HttpArgumentsHost) {
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();
		const appLoggerDto: LoggerDto = new LoggerDto(
			VariablesConstant.ERROR,
			"error_catch_in_commonexception_filter",
			"UtilsModule",
			"CommonExceptionFilter",
			"catch",
			exception
		);
		appLoggerDto.addMethodAndRequest("", request);
		this.appLoggerService.writeLog(appLoggerDto);
		response.status(200).send({
			errorCode: ResponseData.UNKNOWN_ERROR_OCCURRED["errorCode"],
			errorMessage: ResponseData.UNKNOWN_ERROR_OCCURRED["errorMessage"],
			data: {}
		});
	}
}
