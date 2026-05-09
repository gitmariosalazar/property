import { Injectable } from '@nestjs/common';
import { InterfacePropertyRepository } from '../../../../domain/contracts/property.interface.repository';
import { Exists } from '../../../../../../shared/interfaces/verify-exists';
import {
  PropertyByTypeSQLResponse,
  PropertySQLResponse,
} from '../../../interfaces/sql/property.sql.response';
import {
  PropertyByTypeResponse,
  PropertyResponse,
} from '../../../../domain/schemas/dto/response/property.response';
import { PropertyAdapter } from '../../../adapters/property.adapter';
import { RpcException } from '@nestjs/microservices';
import { PropertyModel } from '../../../../domain/schemas/models/property.model';
import { DatabaseAbstract } from '../../../../../../shared/connections/database/abstract/abstract.database';

@Injectable()
export class MySqlPropertyPersistence implements InterfacePropertyRepository {
  constructor(private readonly databaseService: DatabaseAbstract) {}

  async verifyPropertyExists(propertyCadastralKey: string): Promise<boolean> {
    try {
      const query = `SELECT EXISTS(SELECT 1 FROM predio WHERE clave_catastral = ?) AS "exists"`;
      const params = [propertyCadastralKey];
      const result = await this.databaseService.query<Exists>(query, params);
      return result[0].exists;
    } catch (error) {
      throw error;
    }
  }

  async getPropertyById(
    propertyCadastralKey: string,
  ): Promise<PropertyResponse | null> {
    try {
      const query = `
        SELECT
            p.predio_id as "propertyId",
            p.clave_catastral as "propertyCadastralKey",
            p.cliente_id as "propertyClientId",
            p.callejon as "properttyAlleyway",
            p.sector as "propertySector",
            p.direccion as "propertyAddress",
            p.area_terreno as "propertyLandArea",
            p.area_construccion as "propertyConstrucctionArea",
            p.valor_terreno as "propertyLandValue",
            p.valor_construccion as "propertyConstrucctionValue",
            p.valor_comercial as "propertyComercialValue",
            p.coordenadas as "propertyCoordinates",
            p.referencia as "propertyReference",
            p.altitud as "propertyAltitude",
            p.precision as "propertyPrecision",
            p.tipo_predio_id as "propertyTypeId",
            tp.nombre as "propertyTypeName"
        FROM predio p
        LEFT JOIN tipo_predio tp ON tp.tipo_predio_id = p.tipo_predio_id
        WHERE p.clave_catastral = ?;
      `;

      const params = [propertyCadastralKey];

      const result = await this.databaseService.query<PropertySQLResponse>(
        query,
        params,
      );

      const response: PropertyResponse[] = result.map((propertySqlResponse) =>
        PropertyAdapter.fromPropertySqlResponseToPropertyResponse(
          propertySqlResponse,
        ),
      );

      if (response.length === 0) {
        throw new RpcException({
          statusCode: 404,
          message: `Property with cadastral key ${propertyCadastralKey} not found`,
        });
      }

      return response[0];
    } catch (error) {
      throw error;
    }
  }

  async findAllProperties(
    limit: number,
    offset: number,
  ): Promise<PropertyResponse[]> {
    try {
      const query = `
        SELECT
            p.predio_id as "propertyId",
            p.clave_catastral as "propertyCadastralKey",
            p.cliente_id as "propertyClientId",
            p.callejon as "properttyAlleyway",
            p.sector as "propertySector",
            p.direccion as "propertyAddress",
            p.area_terreno as "propertyLandArea",
            p.area_construccion as "propertyConstrucctionArea",
            p.valor_terreno as "propertyLandValue",
            p.valor_construccion as "propertyConstrucctionValue",
            p.valor_comercial as "propertyComercialValue",
            p.coordenadas as "propertyCoordinates",
            p.referencia as "propertyReference",
            p.altitud as "propertyAltitude",
            p.precision as "propertyPrecision",
            p.tipo_predio_id as "propertyTypeId",
            tp.nombre as "propertyTypeName"
        FROM predio p
        LEFT JOIN tipo_predio tp ON tp.tipo_predio_id = p.tipo_predio_id
        ORDER BY p.predio_id
        LIMIT ? OFFSET ?;
      `;

      const params = [Number(limit), Number(offset)];
      const result = await this.databaseService.query<PropertySQLResponse>(
        query,
        params,
      );

      const response: PropertyResponse[] = result.map((propertySqlResponse) =>
        PropertyAdapter.fromPropertySqlResponseToPropertyResponse(
          propertySqlResponse,
        ),
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createProperty(
    property: PropertyModel,
  ): Promise<PropertyResponse | null> {
    try {
      const query = `
        INSERT INTO predio (
          clave_catastral,
          cliente_id,
          callejon,
          sector,
          direccion,
          area_terreno,
          area_construccion,
          valor_terreno,
          valor_construccion,
          valor_comercial,
          coordenadas,
          referencia,
          altitud,
          precision,
          tipo_predio_id
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
          ?, ?, ?, ?
        );
      `;

      const params = [
        property.getPropertyCadastralKey(),
        property.getPropertyClientId(),
        property.getPropertyAlleyway(),
        property.getPropertySector(),
        property.getPropertyAddress(),
        property.getPropertyLandArea(),
        property.getPropertyConstructionArea(),
        property.getPropertyLandValue(),
        property.getPropertyConstructionValue(),
        property.getPropertyCommercialValue(),
        property.getPropertyCoordinates(),
        property.getPropertyReference(),
        property.getPropertyAltitude(),
        property.getPropertyPrecision(),
        property.getPropertyTypeId(),
      ];

      const result = await this.databaseService.execute(query, params);

      if (result.affectedRows === 0) {
        throw new RpcException({
          statusCode: 500,
          message: 'Failed to create property',
        });
      }

      const selectQuery = `
        SELECT
            p.predio_id as "propertyId",
            p.clave_catastral as "propertyCadastralKey",
            p.cliente_id as "propertyClientId",
            p.callejon as "properttyAlleyway",
            p.sector as "propertySector",
            p.direccion as "propertyAddress",
            p.area_terreno as "propertyLandArea",
            p.area_construccion as "propertyConstrucctionArea",
            p.valor_terreno as "propertyLandValue",
            p.valor_construccion as "propertyConstrucctionValue",
            p.valor_comercial as "propertyComercialValue",
            p.coordenadas as "propertyCoordinates",
            p.referencia as "propertyReference",
            p.altitud as "propertyAltitude",
            p.precision as "propertyPrecision",
            p.tipo_predio_id as "propertyTypeId",
            tp.nombre as "propertyTypeName"
        FROM predio p
        LEFT JOIN tipo_predio tp ON tp.tipo_predio_id = p.tipo_predio_id
        WHERE p.clave_catastral = ?;
      `;
      const selectResult =
        await this.databaseService.query<PropertySQLResponse>(selectQuery, [
          property.getPropertyCadastralKey(),
        ]);

      const response =
        PropertyAdapter.fromPropertySqlResponseToPropertyResponse(
          selectResult[0],
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProperty(
    propertyCadastralKey: string,
    property: PropertyModel,
  ): Promise<PropertyResponse | null> {
    try {
      const query = `
        UPDATE predio SET
          cliente_id = COALESCE(?, cliente_id),
          callejon = COALESCE(?, callejon),
          sector = COALESCE(?, sector),
          direccion = COALESCE(?, direccion),
          area_terreno = COALESCE(?, area_terreno),
          area_construccion = COALESCE(?, area_construccion),
          valor_terreno = COALESCE(?, valor_terreno),
          valor_construccion = COALESCE(?, valor_construccion),
          valor_comercial = COALESCE(?, valor_comercial),
          -- coordenadas = COALESCE(?, coordenadas),
          referencia = COALESCE(?, referencia),
          altitud = COALESCE(?, altitud),
          precision = COALESCE(?, precision),
          tipo_predio_id = COALESCE(?, tipo_predio_id)
        WHERE clave_catastral = ?;
      `;

      const params = [
        property.getPropertyClientId(),
        property.getPropertyAlleyway(),
        property.getPropertySector(),
        property.getPropertyAddress(),
        property.getPropertyLandArea(),
        property.getPropertyConstructionArea(),
        property.getPropertyLandValue(),
        property.getPropertyConstructionValue(),
        property.getPropertyCommercialValue(),
        //property.getPropertyCoordinates(),
        property.getPropertyReference(),
        property.getPropertyAltitude(),
        property.getPropertyPrecision(),
        property.getPropertyTypeId(),
        propertyCadastralKey,
      ];

      const result = await this.databaseService.execute(query, params);

      if (result.affectedRows === 0) {
        throw new RpcException({
          statusCode: 404,
          message: `Property with cadastral key ${propertyCadastralKey} not found`,
        });
      }

      const selectQuery = `
        SELECT
            p.predio_id as "propertyId",
            p.clave_catastral as "propertyCadastralKey",
            p.cliente_id as "propertyClientId",
            p.callejon as "properttyAlleyway",
            p.sector as "propertySector",
            p.direccion as "propertyAddress",
            p.area_terreno as "propertyLandArea",
            p.area_construccion as "propertyConstrucctionArea",
            p.valor_terreno as "propertyLandValue",
            p.valor_construccion as "propertyConstrucctionValue",
            p.valor_comercial as "propertyComercialValue",
            p.coordenadas as "propertyCoordinates",
            p.referencia as "propertyReference",
            p.altitud as "propertyAltitude",
            p.precision as "propertyPrecision",
            p.tipo_predio_id as "propertyTypeId",
            tp.nombre as "propertyTypeName"
        FROM predio p
        LEFT JOIN tipo_predio tp ON tp.tipo_predio_id = p.tipo_predio_id
        WHERE p.clave_catastral = ?;
      `;
      const selectResult =
        await this.databaseService.query<PropertySQLResponse>(selectQuery, [
          propertyCadastralKey,
        ]);

      const response =
        PropertyAdapter.fromPropertySqlResponseToPropertyResponse(
          selectResult[0],
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteProperty(propertyCadastralKey: string): Promise<boolean> {
    try {
      const query = `DELETE FROM predio WHERE clave_catastral = ?`;
      const params = [propertyCadastralKey];
      const result = await this.databaseService.execute(query, params);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  async findPropertiesByOwner(
    clientId: string,
    limit: number,
    offset: number,
  ): Promise<PropertyResponse[]> {
    try {
      const query = `
        SELECT
            p.predio_id as "propertyId",
            p.clave_catastral as "propertyCadastralKey",
            p.cliente_id as "propertyClientId",
            p.callejon as "properttyAlleyway",
            p.sector as "propertySector",
            p.direccion as "propertyAddress",
            p.area_terreno as "propertyLandArea",
            p.area_construccion as "propertyConstrucctionArea",
            p.valor_terreno as "propertyLandValue",
            p.valor_construccion as "propertyConstrucctionValue",
            p.valor_comercial as "propertyComercialValue",
            p.coordenadas as "propertyCoordinates",
            p.referencia as "propertyReference",
            p.altitud as "propertyAltitude",
            p.precision as "propertyPrecision",
            p.tipo_predio_id as "propertyTypeId",
            tp.nombre as "propertyTypeName"
        FROM predio p
        LEFT JOIN tipo_predio tp ON tp.tipo_predio_id = p.tipo_predio_id
        WHERE p.cliente_id = ?
        ORDER BY p.predio_id
        LIMIT ? OFFSET ?;
      `;

      const params = [clientId, Number(limit), Number(offset)];
      const result = await this.databaseService.query<PropertySQLResponse>(
        query,
        params,
      );

      const response: PropertyResponse[] = result.map((propertySqlResponse) =>
        PropertyAdapter.fromPropertySqlResponseToPropertyResponse(
          propertySqlResponse,
        ),
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async findPropertiesByType(): Promise<PropertyByTypeResponse[]> {
    try {
      const query = `
        SELECT
          p.tipo_predio_id AS property_type_id,
          tp.nombre AS property_type,

          -- Volume and Distribution
          COUNT(p.predio_id) AS total_properties,
          ROUND( (COUNT(p.predio_id) * 100.0 / SUM(COUNT(p.predio_id)) OVER ()), 2) AS percentage_of_total,

          -- Areas
          SUM(p.area_terreno) AS total_land_area_m2,
          SUM(p.area_construccion) AS total_built_area_m2,

          ROUND(AVG(p.area_terreno), 2) AS avg_land_area_m2,
          ROUND(AVG(NULLIF(p.area_construccion, 0)), 2) AS avg_built_area_m2,

          -- Land Use Ratio (Floor Area Ratio)
          ROUND(
              AVG(p.area_construccion / NULLIF(p.area_terreno, 0)),
              4
          ) AS avg_floor_area_ratio,

          -- Weighted Unit Prices
          ROUND(
              (SUM(p.valor_terreno) / NULLIF(SUM(p.area_terreno), 0)),
              2
          ) AS weighted_price_per_m2_land,

          ROUND(
              (SUM(p.valor_construccion) / NULLIF(SUM(p.area_construccion), 0)),
              2
          ) AS weighted_price_per_m2_built,

          -- Commercial / Financial Value
          ROUND(SUM(p.valor_comercial), 2) AS total_portfolio_value,
          ROUND(AVG(p.valor_comercial), 2) AS avg_property_value,

          -- Median Value
          ROUND(
              AVG(p.valor_comercial),
              2
          ) AS median_property_value,

          -- Data Quality Alerts
          ROUND(
              (SUM(CASE WHEN p.coordenadas IS NULL THEN 1 ELSE 0 END) * 100.0 / COUNT(*)),
              2
          ) AS percentage_without_coordinates,

          SUM(CASE WHEN p.area_construccion > 0
                  AND COALESCE(p.valor_construccion, 0) = 0
                  THEN 1 ELSE 0 END) AS alerts_missing_construction_value,

          SUM(CASE WHEN p.area_construccion > p.area_terreno THEN 1 ELSE 0 END)
              AS properties_with_built_area_exceeding_land

        FROM predio p
        INNER JOIN tipo_predio tp
            ON tp.tipo_predio_id = p.tipo_predio_id

        WHERE p.area_terreno > 0.1
          AND p.valor_comercial IS NOT NULL

        GROUP BY p.tipo_predio_id, tp.nombre
        ORDER BY total_portfolio_value DESC;
      `;

      const result: PropertyByTypeSQLResponse[] =
        await this.databaseService.query<PropertyByTypeSQLResponse>(query);

      const response: PropertyByTypeResponse[] = result.map(
        (propertyByTypeSqlResponse) =>
          PropertyAdapter.fromPropertyByTypeSqlResponseToPropertyByTypeResponse(
            propertyByTypeSqlResponse,
          ),
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
