

import { FastifyReply } from 'fastify';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger';


export function sendResponse(
  reply: FastifyReply,
  statusCode: number,
  message: string,
  data?: any,
) {
  reply.status(statusCode).send({
    statusCode,
    message,
    data: data,
    timestamp: new Date().toISOString(),
  });
};

interface ApiResponseOptions {
  type?: Type<unknown>;
  isArray?: boolean;
  description?: string;
  dataField?: string;
  message?: string;
  additionalProperties?: Record<string, any>;
};

const defaultResponses = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

function createApiResponse(status: number, options?: ApiResponseOptions) {
  const { type, isArray, description, dataField, additionalProperties, message } = options || {};

  if (type) {
    let schema: any = isArray
      ? { type: 'array', items: { $ref: getSchemaPath(type) } }
      : { $ref: getSchemaPath(type) };

    if (dataField) {
      schema = {
        type: 'object',
        properties: {
          [dataField]: schema
        }
      };
    }

    if (additionalProperties) {
      for (const [key, value] of Object.entries(additionalProperties)) {
        if (!schema.properties) {
          schema.properties = {};
        }
        schema.properties[key] = value;
      }
    }

    return ApiOkResponse({
      description: description || 'Successful operation',
      schema: {
        properties: {
          statusCode: { type: 'number', example: status },
          message: { type: 'string', example: message || 'string' },
          data: schema,
        },
      },
    });
  }

  return ApiResponse({
    status,
    description: description || defaultResponses[status] || 'Operation response',
    schema: {
      properties: {
        statusCode: { type: 'number', example: status },
        message: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' },
        ...(status >= 400 && { path: { type: 'string' } }),
      },
    },
  });
};

export function ApiResponses(options?: ApiResponseOptions) {
  const decorators = [
    options?.type ? ApiExtraModels(options.type) : null,
    createApiResponse(200, options),
    ...Object.keys(defaultResponses).map(status =>
      createApiResponse(parseInt(status))
    ),
  ].filter(Boolean);

  return applyDecorators(...decorators);
};

