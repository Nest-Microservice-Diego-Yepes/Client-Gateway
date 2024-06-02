import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderStatus, orderStatusList } from '../enum/order-enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(orderStatusList, {
    message: `Order valid status ${orderStatusList}`,
  })
  status: OrderStatus;
}
