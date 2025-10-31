export class CreatePropertyRequest {
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
  longitude: number;
  latitude: number;
  propertyReference: string;
  propertyAltitude: number;
  propertyPrecision: number;
  propertyTypeId: number;

  constructor(
    propertyCadastralKey: string,
    propertyClientId: string,
    propertyAlleyway: string,
    propertySector: string,
    propertyAddress: string,
    propertyLandArea: number,
    propertyConstructionArea: number,
    propertyLandValue: number,
    propertyConstructionValue: number,
    propertyCommercialValue: number,
    longitude: number,
    latitude: number,
    propertyReference: string,
    propertyAltitude: number,
    propertyPrecision: number,
    propertyTypeId: number,
  ) {
    this.propertyCadastralKey = propertyCadastralKey;
    this.propertyClientId = propertyClientId;
    this.propertyAlleyway = propertyAlleyway;
    this.propertySector = propertySector;
    this.propertyAddress = propertyAddress;
    this.propertyLandArea = propertyLandArea;
    this.propertyConstructionArea = propertyConstructionArea;
    this.propertyLandValue = propertyLandValue;
    this.propertyConstructionValue = propertyConstructionValue;
    this.propertyCommercialValue = propertyCommercialValue;
    this.longitude = longitude;
    this.latitude = latitude;
    this.propertyReference = propertyReference;
    this.propertyAltitude = propertyAltitude;
    this.propertyPrecision = propertyPrecision;
    this.propertyTypeId = propertyTypeId;
  }
}