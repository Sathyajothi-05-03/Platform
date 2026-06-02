import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { RidersService } from './riders.service';
import { UpdateRiderStatusDto, UpdateRiderLocationDto } from './dto/update-rider.dto';

@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Get()
  async findAll() {
    return this.ridersService.findAll();
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateRiderStatusDto) {
    return this.ridersService.updateStatus(id, dto);
  }

  @Patch(':id/location')
  async updateLocation(@Param('id') id: string, @Body() dto: UpdateRiderLocationDto) {
    return this.ridersService.updateLocation(id, dto);
  }
}
