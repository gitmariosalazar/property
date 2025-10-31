import { Inject, Injectable } from "@nestjs/common";
import { InterfacePropertyRepository } from "../../domain/contracts/property.interface.repository";
import { InterfacePropertyUseCase } from "../usecases/property.use-case.interface";
import { RpcException } from "@nestjs/microservices";
import { PropertyResponse } from "../../domain/schemas/dto/response/property.response";
import { statusCode } from "../../../../settings/environments/status-code";
import { CreatePropertyRequest } from "../../domain/schemas/dto/request/create.property.request";
import { validateFields } from "../../../../shared/validators/fields.validators";
import { PropertyModel } from "../../domain/schemas/models/property.model";
import { PropertyMapper } from "../mappers/property.mapper";
import { UpdatePropertyRequest } from "../../domain/schemas/dto/request/update.property.request";

@Injectable()
export class PropertyService implements InterfacePropertyUseCase {
  constructor(
    @Inject('PropertyRepository')
    private readonly propertyRepository: InterfacePropertyRepository,
  ) { }

  async verifyPropertyExists(propertyCadastralKey: string): Promise<boolean> {
    return this.propertyRepository.verifyPropertyExists(propertyCadastralKey);
  }

  async getPropertyById(propertyCadastralKey: string): Promise<PropertyResponse | null> {
    try {
      if (!propertyCadastralKey || propertyCadastralKey.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid propertyCadastralKey provided',
        });
      }

      const verified = await this.propertyRepository.verifyPropertyExists(propertyCadastralKey);
      if (!verified) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Property with cadastral key ${propertyCadastralKey} not found`,
        });
      }

      const property = await this.propertyRepository.getPropertyById(propertyCadastralKey);
      return property;
    } catch (error) {
      throw error;
    }
  }

  async deleteProperty(propertyCadastralKey: string): Promise<boolean> {
    try {

      if (!propertyCadastralKey || propertyCadastralKey.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid propertyCadastralKey provided',
        });
      }

      const verified = await this.propertyRepository.verifyPropertyExists(propertyCadastralKey);
      if (!verified) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Property with cadastral key ${propertyCadastralKey} not found`,
        });
      }

      return this.propertyRepository.deleteProperty(propertyCadastralKey);
    } catch (error) {
      throw error;
    }
  }

  async findAllProperties(limit: number, offset: number): Promise<PropertyResponse[]> {
    try {
      const properties = await this.propertyRepository.findAllProperties(limit, offset);

      if (!properties || properties.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No properties found',
        });
      }

      return properties;
    } catch (error) {
      throw error;
    }
  }

  async createProperty(property: CreatePropertyRequest): Promise<PropertyResponse | null> {
    try {
      const requiredFields: string[] = [
        'propertyCadastralKey',
        'propertyClientId',
        'propertyAlleyway',
        'propertySector',
        'propertyAddress',
        'propertyLandArea',
        'propertyConstructionArea',
        'propertyLandValue',
        'propertyConstructionValue',
        'propertyCommercialValue',
        'longitude',
        'latitude',
        'propertyReference',
        'propertyAltitude',
        'propertyPrecision',
        'propertyTypeId',
      ];

      const missingFieldMessages: string[] = validateFields(property, requiredFields);
      if (missingFieldMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldMessages
        });
      }

      const exists = await this.propertyRepository.verifyPropertyExists(property.propertyCadastralKey);
      if (exists) {
        throw new RpcException({
          statusCode: statusCode.CONFLICT,
          message: `Property with cadastral key ${property.propertyCadastralKey} already exists`,
        });
      }

      const propertyModel: PropertyModel = PropertyMapper.fromCreateRequestToModel(property);

      const newProperty = await this.propertyRepository.createProperty(propertyModel);

      if (!newProperty) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create property',
        });
      }

      return newProperty;

    } catch (error) {
      throw error;
    }
  }

  async updateProperty(propertyCadastralKey: string, property: Partial<UpdatePropertyRequest>): Promise<PropertyResponse | null> {
    try {

      if (!propertyCadastralKey || propertyCadastralKey.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid propertyCadastralKey provided',
        });
      }

      const verified = await this.propertyRepository.verifyPropertyExists(propertyCadastralKey);
      if (!verified) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Property with cadastral key ${propertyCadastralKey} not found`,
        });
      }

      const existingProperty = await this.propertyRepository.getPropertyById(propertyCadastralKey);
      if (!existingProperty) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Property with cadastral key ${propertyCadastralKey} not found`,
        });
      }

      const existingModel: PropertyModel = PropertyMapper.fromResponseToModel(existingProperty);
      const updatedModel: PropertyModel = PropertyMapper.fromUpdateRequestToModel(property, existingModel);

      const updatedProperty = await this.propertyRepository.updateProperty(propertyCadastralKey, updatedModel);

      if (!updatedProperty) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Error updating property',
        });
      }

      return updatedProperty;

    } catch (error) {
      throw error;
    }
  }
}