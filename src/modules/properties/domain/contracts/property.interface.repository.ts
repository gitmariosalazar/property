import { PropertyResponse } from "../schemas/dto/response/property.response";
import { PropertyModel } from "../schemas/models/property.model";

export interface InterfacePropertyRepository {
  createProperty(property: PropertyModel): Promise<PropertyResponse | null>;
  updateProperty(propertyCadastralKey: string, property: PropertyModel): Promise<PropertyResponse | null>;
  getPropertyById(propertyCadastralKey: string): Promise<PropertyResponse | null>;
  deleteProperty(propertyCadastralKey: string): Promise<boolean>;
  verifyPropertyExists(propertyCadastralKey: string): Promise<boolean>;
  findAllProperties(limit: number, offset: number): Promise<PropertyResponse[]>;
}