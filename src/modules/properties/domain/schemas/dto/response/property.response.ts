import { UUID } from "crypto";

export interface PropertyResponse {
  propertyId: UUID;
  propertyCadastralKey: string;
  propertyClientId: string;
  propertyAlleyway: string;
  propertySector: string;
  propertyAddress: string;
  propertyLandArea: number;
  propertyConstructionArea: number;
  propertyLandValue: number;
  propertyConstructionValue: number;
  propertyCommercialValue: number;
  propertyCoordinates: string;
  propertyReference: string;
  propertyAltitude: number;
  propertyPrecision: number;
  propertyTypeId: number;
  propertyTypeName: string;
}
