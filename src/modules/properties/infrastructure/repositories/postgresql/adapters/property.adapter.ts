import {
  PropertyByTypeResponse,
  PropertyResponse,
} from '../../../../domain/schemas/dto/response/property.response';
import {
  PropertyByTypeSQLResponse,
  PropertySQLResponse,
} from '../../../interfaces/sql/property.sql.response';

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

  static fromPropertyByTypeSqlResponseToPropertyByTypeResponse(
    sqlResponse: PropertyByTypeSQLResponse,
  ): PropertyByTypeResponse {
    return {
      tipoPredioId: sqlResponse.property_type_id,
      propertyType: sqlResponse.property_type,
      totalProperties: sqlResponse.total_properties,
      percentageOfTotal: sqlResponse.percentage_of_total,
      totalLandAreaM2: sqlResponse.total_land_area_m2,
      totalBuiltAreaM2: sqlResponse.total_built_area_m2,
      avgLandAreaM2: sqlResponse.avg_land_area_m2,
      avgBuiltAreaM2: sqlResponse.avg_built_area_m2,
      avgFloorAreaRatio: sqlResponse.avg_floor_area_ratio,
      weightedPricePerM2Land: sqlResponse.weighted_price_per_m2_land,
      weightedPricePerM2Built: sqlResponse.weighted_price_per_m2_built,
      totalPortfolioValue: sqlResponse.total_portfolio_value,
      avgPropertyValue: sqlResponse.avg_property_value,
      medianPropertyValue: sqlResponse.median_property_value,
      percentageWithoutCoordinates: sqlResponse.percentage_without_coordinates,
      alertsMissingConstructionValue:
        sqlResponse.alerts_missing_construction_value,
      propertiesWithBuiltAreaExceedingLand:
        sqlResponse.properties_with_built_area_exceeding_land,
    };
  }
}
