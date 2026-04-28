import { UUID } from 'crypto';

export interface PropertySQLResponse {
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

export interface PropertyByTypeSQLResponse {
  property_type_id: number;
  property_type: string;

  // Volume and Distribution
  total_properties: number;
  percentage_of_total: number;

  // Areas
  total_land_area_m2: number;
  total_built_area_m2: number;
  avg_land_area_m2: number;
  avg_built_area_m2: number;

  // Land Use Ratio (Floor Area Ratio)
  avg_floor_area_ratio: number;

  // Weighted Unit Prices (Most Important)
  weighted_price_per_m2_land: number;
  weighted_price_per_m2_built: number;

  // Commercial / Financial Value
  total_portfolio_value: number;
  avg_property_value: number;
  median_property_value: number;

  // Data Quality Alerts
  percentage_without_coordinates: number;
  alerts_missing_construction_value: number;
  properties_with_built_area_exceeding_land: number;
}
