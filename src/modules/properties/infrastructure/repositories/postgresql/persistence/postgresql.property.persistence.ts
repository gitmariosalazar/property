import { Injectable } from '@nestjs/common';
import { DatabaseServicePostgreSQL } from '../../../../../../shared/connections/database/postgresql/postgresql.service';
import { InterfacePropertyRepository } from '../../../../domain/contracts/property.interface.repository';
import { Exists } from '../../../../../../shared/interfaces/verify-exists';
import { PropertySQLResponse } from '../../../interfaces/sql/property.sql.response';
import { PropertyResponse } from '../../../../domain/schemas/dto/response/property.response';
import { PropertyAdapter } from '../adapters/property.adapter';
import { RpcException } from '@nestjs/microservices';
import { PropertyModel } from '../../../../domain/schemas/models/property.model';

@Injectable()
export class PostgresqlPropertyPersistence
  implements InterfacePropertyRepository {
  constructor(private readonly PostgreSqlService: DatabaseServicePostgreSQL) { }

  async verifyPropertyExists(propertyCadastralKey: string): Promise<boolean> {
    try {
      const query = `SELECT EXISTS(SELECT 1 FROM predio WHERE clavecatastral = $1) AS "exists"`;
      const params = [propertyCadastralKey];
      const result = await this.PostgreSqlService.query<Exists>(query, params);
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
            p.predioid as "propertyId",
            p.clavecatastral as "propertyCadastralKey",
            p.clienteid as "propertyClientId",
            p.callejon as "properttyAlleyway",
            p.sector as "propertySector",
            p.direccion as "propertyAddress",
            p.areaterreno as "propertyLandArea",
            p.areaconstruccion as "propertyConstrucctionArea",
            p.valorterreno as "propertyLandValue",
            p.valorconstruccion as "propertyConstrucctionValue",
            p.valorcomercial as "propertyComercialValue",
            p.coordenadas as "propertyCoordinates",
            p.referencia as "propertyReference",
            p.altitud as "propertyAltitude",
            p.precision as "propertyPrecision",
            p.tipopredioid as "propertyTypeId",
            tp.nombre as "propertyTypeName"
        FROM predio p
        LEFT JOIN tipopredio tp ON tp.tipopredioid = p.tipopredioid
        WHERE p.clavecatastral = $1;
      `;

      const params = [propertyCadastralKey];

      const result = await this.PostgreSqlService.query<PropertySQLResponse>(
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

  async findAllProperties(limit: number, offset: number): Promise<PropertyResponse[]> {
    try {

      const query = `
        SELECT
            p.predioid as "propertyId",
            p.clavecatastral as "propertyCadastralKey",
            p.clienteid as "propertyClientId",
            p.callejon as "properttyAlleyway",
            p.sector as "propertySector",
            p.direccion as "propertyAddress",
            p.areaterreno as "propertyLandArea",
            p.areaconstruccion as "propertyConstrucctionArea",
            p.valorterreno as "propertyLandValue",
            p.valorconstruccion as "propertyConstrucctionValue",
            p.valorcomercial as "propertyComercialValue",
            p.coordenadas as "propertyCoordinates",
            p.referencia as "propertyReference",
            p.altitud as "propertyAltitude",
            p.precision as "propertyPrecision",
            p.tipopredioid as "propertyTypeId",
            tp.nombre as "propertyTypeName"
        FROM predio p
        LEFT JOIN tipopredio tp ON tp.tipopredioid = p.tipopredioid
        ORDER BY p.predioid
        LIMIT $1 OFFSET $2;
      `;

      const params = [limit, offset];
      const result = await this.PostgreSqlService.query<PropertySQLResponse>(
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

  async createProperty(property: PropertyModel): Promise<PropertyResponse | null> {
    try {

      const query = `
        INSERT INTO predio (
          clavecatastral,
          clienteid,
          callejon,
          sector,
          direccion,
          areaterreno,
          areaconstruccion,
          valorterreno,
          valorconstruccion,
          valorcomercial,
          coordenadas,
          referencia,
          altitud,
          precision,
          tipopredioid
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 
          $12, $13, $14, $15
        ) RETURNING
          clavecatastral as "propertyCadastralKey",
          clienteid as "propertyClientId",
          callejon as "properttyAlleyway",
          sector as "propertySector",
          direccion as "propertyAddress",
          areaterreno as "propertyLandArea",
          areaconstruccion as "propertyConstrucctionArea",
          valorterreno as "propertyLandValue",
          valorconstruccion as "propertyConstrucctionValue",
          valorcomercial as "propertyComercialValue",
          coordenadas as "propertyCoordinates",
          referencia as "propertyReference",
          altitud as "propertyAltitude",
          precision as "propertyPrecision",
          tipopredioid as "propertyTypeId"
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
        property.getPropertyTypeId()
      ];

      const result = await this.PostgreSqlService.query<PropertySQLResponse>(
        query,
        params,
      );

      if (result.length === 0) {
        throw new RpcException({
          statusCode: 500,
          message: 'Failed to create property',
        });
      }

      const response = PropertyAdapter.fromPropertySqlResponseToPropertyResponse(
        result[0],
      );

      return response;

    } catch (error) {
      throw error;
    }
  }

  async updateProperty(propertyCadastralKey: string, property: PropertyModel): Promise<PropertyResponse | null> {
    try {

      const query = `
        UPDATE predio SET
          clienteid = COALESCE($1, clienteid),
          callejon = COALESCE($2, callejon),
          sector = COALESCE($3, sector),
          direccion = COALESCE($4, direccion),
          areaterreno = COALESCE($5, areaterreno),
          areaconstruccion = COALESCE($6, areaconstruccion),
          valorterreno = COALESCE($7, valorterreno),
          valorconstruccion = COALESCE($8, valorconstruccion),
          valorcomercial = COALESCE($9, valorcomercial),
          coordenadas = COALESCE($10, coordenadas),
          referencia = COALESCE($11, referencia),
          altitud = COALESCE($12, altitud),
          precision = COALESCE($13, precision),
          tipopredioid = COALESCE($14, tipopredioid)
        WHERE clavecatastral = $15
        RETURNING
          clavecatastral as "propertyCadastralKey",
          clienteid as "propertyClientId",
          callejon as "properttyAlleyway",
          sector as "propertySector",
          direccion as "propertyAddress",
          areaterreno as "propertyLandArea",
          areaconstruccion as "propertyConstrucctionArea",
          valorterreno as "propertyLandValue",
          valorconstruccion as "propertyConstrucctionValue",
          valorcomercial as "propertyComercialValue",
          coordenadas as "propertyCoordinates",
          referencia as "propertyReference",
          altitud as "propertyAltitude",
          precision as "propertyPrecision",
          tipopredioid as "propertyTypeId"
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
        property.getPropertyCoordinates(),
        property.getPropertyReference(),
        property.getPropertyAltitude(),
        property.getPropertyPrecision(),
        property.getPropertyTypeId(),
        propertyCadastralKey
      ];

      const result = await this.PostgreSqlService.query<PropertySQLResponse>(
        query,
        params,
      );

      if (result.length === 0) {
        throw new RpcException({
          statusCode: 404,
          message: `Property with cadastral key ${propertyCadastralKey} not found`,
        });
      }

      const response = PropertyAdapter.fromPropertySqlResponseToPropertyResponse(
        result[0],
      );

      return response;

    } catch (error) {
      throw error;
    }
  }

  async deleteProperty(propertyCadastralKey: string): Promise<boolean> {
    try {

      const query = `DELETE FROM predio WHERE clavecatastral = $1`;
      const params = [propertyCadastralKey];
      const result = await this.PostgreSqlService.query(query, params);
      return result.length > 0;

    } catch (error) {
      throw error;
    }
  }
}
