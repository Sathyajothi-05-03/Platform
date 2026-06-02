import { Module } from '@nestjs/common';
import { RedisService } from '../../../shared/redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class AppRedisModule {}
