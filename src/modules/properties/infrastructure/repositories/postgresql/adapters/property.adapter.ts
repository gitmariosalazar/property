import { PropertyResponse } from "../../../../domain/schemas/dto/response/property.response";
import { PropertySQLResponse } from "../../../interfaces/sql/property.sql.response";

export class PropertyAdapter {
  static fromPropertySqlResponseToPropertyResponse(
    sqlResponse: PropertySQLResponse,
  ): PropertyResponse {
    return {
      propertyId: sqlResponse.propertyId,
      propertyCadastralKey: sqlResponse.propertyCadastralKey,
      propertyClientId: sqlResponse.propertyClientId,
      propertyAlleyway: sqlResponse.propertyAlleyway,
      propertySector: sqlResponse.propertySector,
      propertyAddress: sqlResponse.propertyAddress,
      propertyLandArea: sqlResponse.propertyLandArea,
      propertyConstructionArea: sqlResponse.propertyConstructionArea,
      propertyLandValue: sqlResponse.propertyLandValue,
      propertyConstructionValue: sqlResponse.propertyConstructionValue,
      propertyCommercialValue: sqlResponse.propertyCommercialValue,
      propertyCoordinates: sqlResponse.propertyCoordinates,
      propertyReference: sqlResponse.propertyReference,
      propertyAltitude: sqlResponse.propertyAltitude,
      propertyPrecision: sqlResponse.propertyPrecision,
      propertyTypeId: sqlResponse.propertyTypeId,
      propertyTypeName: sqlResponse.propertyTypeName,
    };
  }
}