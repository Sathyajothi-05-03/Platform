import { RidersService } from './riders.service';
import { UpdateRiderStatusDto, UpdateRiderLocationDto } from './dto/update-rider.dto';
export declare class RidersController {
    private readonly ridersService;
    constructor(ridersService: RidersService);
    findAll(): Promise<import("./rider.schema").Rider[]>;
    updateStatus(id: string, dto: UpdateRiderStatusDto): Promise<import("./rider.schema").Rider>;
    updateLocation(id: string, dto: UpdateRiderLocationDto): Promise<import("./rider.schema").Rider>;
}
