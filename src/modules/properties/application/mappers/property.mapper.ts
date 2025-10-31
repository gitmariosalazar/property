import { CreatePropertyRequest } from "../../domain/schemas/dto/request/create.property.request";
import { PropertyResponse } from "../../domain/schemas/dto/response/property.response";
import { PropertyModel } from "../../domain/schemas/models/property.model";

export class PropertyMapper {
  static fromCreateRequestToModel(createRequest: CreatePropertyRequest): PropertyModel {
    return new PropertyModel(
      createRequest.propertyCadastralKey,
      createRequest.propertyClientId,
      createRequest.propertyAlleyway,
      createRequest.propertySector,
      createRequest.propertyAddress,
      createRequest.propertyLandArea,
      createRequest.propertyConstructionArea,
      createRequest.propertyLandValue,
      createRequest.propertyConstructionValue,
      createRequest.propertyCommercialValue,
      `POINT(${createRequest.longitude} ${createRequest.latitude})`,
      createRequest.propertyReference,
      createRequest.propertyAltitude,
      createRequest.propertyPrecision,
      createRequest.propertyTypeId,
    );
  }

  static fromUpdateRequestToModel(updateRequest: Partial<CreatePropertyRequest>, existingModel: PropertyModel): PropertyModel {
    return new PropertyModel(
      updateRequest.propertyCadastralKey || existingModel['propertyCadastralKey'],
      updateRequest.propertyClientId || existingModel['propertyClientId'],
      updateRequest.propertyAlleyway || existingModel['propertyAlleyway'],
      updateRequest.propertySector || existingModel['propertySector'],
      updateRequest.propertyAddress || existingModel['propertyAddress'],
      updateRequest.propertyLandArea || existingModel['propertyLandArea'],
      updateRequest.propertyConstructionArea || existingModel['propertyConstructionArea'],
      updateRequest.propertyLandValue || existingModel['propertyLandValue'],
      updateRequest.propertyConstructionValue || existingModel['propertyConstructionValue'],
      updateRequest.propertyCommercialValue || existingModel['propertyCommercialValue'],
      `POINT(${updateRequest.longitude || existingModel['longitude']} ${updateRequest.latitude || existingModel['latitude']})`,
      updateRequest.propertyReference || existingModel['propertyReference'],
      updateRequest.propertyAltitude || existingModel['propertyAltitude'],
      updateRequest.propertyPrecision || existingModel['propertyPrecision'],
      updateRequest.propertyTypeId || existingModel['propertyTypeId'],
      existingModel['propertyTypeName'],
      existingModel.getPropertyId(),
    );
  }

  static fromResponseToModel(response: PropertyResponse): PropertyModel {
    return new PropertyModel(
      response.propertyCadastralKey,
      response.propertyClientId,
      response.propertyAlleyway,
      response.propertySector,
      response.propertyAddress,
      response.propertyLandArea,
      response.propertyConstructionArea,
      response.propertyLandValue,
      response.propertyConstructionValue,
      response.propertyCommercialValue,
      response.propertyCoordinates,
      response.propertyReference,
      response.propertyAltitude,
      response.propertyPrecision,
      response.propertyTypeId,
      response.propertyTypeName,
      response.propertyId,
    );
  }
}