import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationMetaDto } from '../dto/pagination-meta.dto';

export const ApiOkResponseData = (
  model: Type<unknown>,
  options: {
    isArray?: boolean;
    paginated?: boolean;
    meta?: Type<unknown>;
  } = {},
) => {
  const isArray = options.isArray || options.paginated;

  return applyDecorators(
    ApiExtraModels(
      model,
      PaginationMetaDto,
      ...(options.meta ? [options.meta] : []),
    ),
    ApiOkResponse({
      schema: {
        properties: {
          statusCode: { type: 'number', example: 200 },
          message: { type: 'string', example: '' },
          data: isArray
            ? { type: 'array', items: { $ref: getSchemaPath(model) } }
            : { $ref: getSchemaPath(model) },
          ...(options.paginated && {
            pagination: { $ref: getSchemaPath(PaginationMetaDto) },
          }),
          ...(options.meta && {
            meta: { $ref: getSchemaPath(options.meta) },
          }),
        },
      },
    }),
  );
};
