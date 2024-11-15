import { Controller, Get, Query, Param } from '@nestjs/common';
import { Public } from '../auth/AuthMetadata'; // Assurez-vous d'avoir ce décorateur
import { VintedService } from './vinted.service';

@Controller('vinted')
export class VintedController {
  constructor(
  private vintedService: VintedService,
  ){}
  /*
    @Get()
  async getAllItems(): Promise<VintedItem[]> {
    return await this.vintedService.getItems();
  }
    */
   @Public()
  @Get('latest')
  async getLatestItems() {
    console.log('Entering getLatestItems controller');
    try {
      const result = await this.vintedService.getLatestItems();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  /*
  @Get(':id')
  async getItem(@Param('id') id: string) {
    return await this.vintedService.getItemById(id);
  }
    */
}
