
import { Controller, Get, Post, Put, Delete } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreatePropertyRequest } from "../../domain/schemas/dto/request/create.property.request";
import { UpdatePropertyRequest } from "../../domain/schemas/dto/request/update.property.request";
import { PropertyService } from "../../application/services/property.service";

@Controller('properties')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService
  ) { }

  @Post('create-property')
  @MessagePattern('properties.create-property')
  async createProperty(@Payload() property: CreatePropertyRequest) {
    return this.propertyService.createProperty(property);
  }

  @Put('update-property/:propertyCadastralKey')
  @MessagePattern('properties.update-property')
  async updateProperty(@Payload() data: { propertyCadastralKey: string; property: UpdatePropertyRequest }) {
    return this.propertyService.updateProperty(data.propertyCadastralKey, data.property);
  }

  @Get('get-property/:propertyCadastralKey')
  @MessagePattern('properties.get-property-by-id')
  async getPropertyById(@Payload() propertyCadastralKey: string) {
    return this.propertyService.getPropertyById(propertyCadastralKey);
  }

  @Get('get-all-properties')
  @MessagePattern('properties.get-all-properties')
  async getAllProperties(@Payload() data: { limit?: number; offset?: number }) {
    const limit = data?.limit ?? 100;
    const offset = data?.offset ?? 0;
    return await this.propertyService.findAllProperties(limit, offset);
  }

  @Delete('delete-property/:propertyCadastralKey')
  @MessagePattern('properties.delete-property')
  async deleteProperty(@Payload() propertyCadastralKey: string) {
    return this.propertyService.deleteProperty(propertyCadastralKey);
  }

  @Get('verify-property-exists/:propertyCadastralKey')
  @MessagePattern('properties.verify-property-exists')
  async verifyPropertyExists(@Payload() propertyCadastralKey: string) {
    return this.propertyService.verifyPropertyExists(propertyCadastralKey);
  }
}