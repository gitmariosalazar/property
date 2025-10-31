import { CreatePropertyRequest } from '../../domain/schemas/dto/request/create.property.request';
import { UpdatePropertyRequest } from '../../domain/schemas/dto/request/update.property.request';
import { PropertyResponse } from '../../domain/schemas/dto/response/property.response';

export interface InterfacePropertyUseCase {
  createProperty(
    property: CreatePropertyRequest,
  ): Promise<PropertyResponse | null>;
  updateProperty(
    propertyCadastralKey: string,
    property: Partial<UpdatePropertyRequest>,
  ): Promise<PropertyResponse | null>;
  getPropertyById(
    propertyCadastralKey: string,
  ): Promise<PropertyResponse | null>;
  deleteProperty(propertyCadastralKey: string): Promise<boolean>;
  verifyPropertyExists(propertyCadastralKey: string): Promise<boolean>;
  findAllProperties(limit: number, offset: number): Promise<PropertyResponse[]>;
}
