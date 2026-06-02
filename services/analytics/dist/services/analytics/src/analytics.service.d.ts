import { RedisService } from "../../../shared/redis.service";
export declare class AnalyticsService {
    private readonly redisService;
    constructor(redisService: RedisService);
    getOrderStats(): Promise<any>;
    getRiderPerformance(): Promise<any>;
}
