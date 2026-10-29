import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { PAGINATION_DEFAULTS } from '../dto/pagination.dto';
import { Reflector } from '@nestjs/core';
import { IS_PAGINATIED_KEY } from '../decorators/pagination.decorator';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const isPaginated = this.reflector.getAllAndOverride<boolean>(
      IS_PAGINATIED_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!isPaginated) return next.handle();
    const req = ctx.switchToHttp().getRequest();
    const limit = Number(req.query.limit ?? PAGINATION_DEFAULTS.LIMIT);
    const offset = Number(req.query.offset ?? PAGINATION_DEFAULTS.OFFSET);

    return next.handle().pipe(
      map((result) => {
        const [items, total, meta] = result.data as [
          unknown[],
          number,
          Record<string, unknown>?,
        ];
        return {
          ...result,
          data: items,
          ...(meta && { meta }),
          pagination: {
            total,
            limit,
            offset,
            hasNext: offset + items.length < total,
          },
        };
      }),
    );
  }
}
