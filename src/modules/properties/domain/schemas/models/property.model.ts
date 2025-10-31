import { UUID } from "crypto";

export class PropertyModel {
  private propertyId: UUID;
  private propertyCadastralKey: string;
  private propertyClientId: string;
  private propertyAlleyway: string;
  private propertySector: string;
  private propertyAddress: string;
  private propertyLandArea: number;
  private propertyConstructionArea: number;
  private propertyLandValue: number;
  private propertyConstructionValue: number;
  private propertyCommercialValue: number;
  private propertyCoordinates: string;
  private propertyReference: string;
  private propertyAltitude: number;
  private propertyPrecision: number;
  private propertyTypeId: number;
  private propertyTypeName: string;

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
    propertyCoordinates: string,
    propertyReference: string,
    propertyAltitude: number,
    propertyPrecision: number,
    propertyTypeId: number,
    propertyTypeName?: string,
    propertyId?: UUID,
  ) {
    this.propertyId = propertyId || crypto.randomUUID();
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
    this.propertyCoordinates = propertyCoordinates;
    this.propertyReference = propertyReference;
    this.propertyAltitude = propertyAltitude;
    this.propertyPrecision = propertyPrecision;
    this.propertyTypeId = propertyTypeId;
    this.propertyTypeName = propertyTypeName || '';
  }

  public getPropertyId(): UUID {
    return this.propertyId;
  }

  public setPropertyId(propertyId: UUID): void {
    this.propertyId = propertyId;
  }

  public getPropertyCadastralKey(): string {
    return this.propertyCadastralKey;
  }

  public setPropertyCadastralKey(propertyCadastralKey: string): void {
    this.propertyCadastralKey = propertyCadastralKey;
  }

  public getPropertyClientId(): string {
    return this.propertyClientId;
  }

  public setPropertyClientId(propertyClientId: string): void {
    this.propertyClientId = propertyClientId;
  }

  public getPropertyAlleyway(): string {
    return this.propertyAlleyway;
  }

  public setPropertyAlleyway(propertyAlleyway: string): void {
    this.propertyAlleyway = propertyAlleyway;
  }

  public getPropertySector(): string {
    return this.propertySector;
  }

  public setPropertySector(propertySector: string): void {
    this.propertySector = propertySector;
  }

  public getPropertyAddress(): string {
    return this.propertyAddress;
  }

  public setPropertyAddress(propertyAddress: string): void {
    this.propertyAddress = propertyAddress;
  }

  public getPropertyLandArea(): number {
    return this.propertyLandArea;
  }

  public setPropertyLandArea(propertyLandArea: number): void {
    this.propertyLandArea = propertyLandArea;
  }

  public getPropertyConstructionArea(): number {
    return this.propertyConstructionArea;
  }

  public setPropertyConstructionArea(propertyConstructionArea: number): void {
    this.propertyConstructionArea = propertyConstructionArea;
  }

  public getPropertyLandValue(): number {
    return this.propertyLandValue;
  }

  public setPropertyLandValue(propertyLandValue: number): void {
    this.propertyLandValue = propertyLandValue;
  }

  public getPropertyConstructionValue(): number {
    return this.propertyConstructionValue;
  }

  public setPropertyConstructionValue(propertyConstructionValue: number): void {
    this.propertyConstructionValue = propertyConstructionValue;
  }

  public getPropertyCommercialValue(): number {
    return this.propertyCommercialValue;
  }

  public setPropertyCommercialValue(propertyCommercialValue: number): void {
    this.propertyCommercialValue = propertyCommercialValue;
  }

  public getPropertyCoordinates(): string {
    return this.propertyCoordinates;
  }

  public setPropertyCoordinates(propertyCoordinates: string): void {
    this.propertyCoordinates = propertyCoordinates;
  }

  public getPropertyReference(): string {
    return this.propertyReference;
  }

  public setPropertyReference(propertyReference: string): void {
    this.propertyReference = propertyReference;
  }

  public getPropertyAltitude(): number {
    return this.propertyAltitude;
  }

  public setPropertyAltitude(propertyAltitude: number): void {
    this.propertyAltitude = propertyAltitude;
  }

  public getPropertyPrecision(): number {
    return this.propertyPrecision;
  }

  public setPropertyPrecision(propertyPrecision: number): void {
    this.propertyPrecision = propertyPrecision;
  }

  public getPropertyTypeId(): number {
    return this.propertyTypeId;
  }

  public setPropertyTypeId(propertyTypeId: number): void {
    this.propertyTypeId = propertyTypeId;
  }

  public getPropertyTypeName(): string {
    return this.propertyTypeName;
  }

  public setPropertyTypeName(propertyTypeName: string): void {
    this.propertyTypeName = propertyTypeName;
  }


  toJSON(): Record<string, any> {
    return {
      propertyId: this.propertyId,
      propertyCadastralKey: this.propertyCadastralKey,
      propertyClientId: this.propertyClientId,
      propertyAlleyway: this.propertyAlleyway,
      propertySector: this.propertySector,
      propertyAddress: this.propertyAddress,
      propertyLandArea: this.propertyLandArea,
      propertyConstructionArea: this.propertyConstructionArea,
      propertyLandValue: this.propertyLandValue,
      propertyConstructionValue: this.propertyConstructionValue,
      propertyCommercialValue: this.propertyCommercialValue,
      propertyCoordinates: this.propertyCoordinates,
      propertyReference: this.propertyReference,
      propertyAltitude: this.propertyAltitude,
      propertyPrecision: this.propertyPrecision,
      propertyTypeId: this.propertyTypeId,
      propertyTypeName: this.propertyTypeName,
    };
  }
}