import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { RedisService } from '@shared/redis.service';

@Module({
  providers: [AnalyticsService, RedisService],
  exports: [AnalyticsService, RedisService],
})
export class AnalyticsModule {}
