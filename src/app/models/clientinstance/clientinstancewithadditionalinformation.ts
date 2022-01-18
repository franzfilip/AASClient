import { ClientInstanceDto } from "./clientinstancedto";

export interface ClientInstanceWithAdditionalInformation extends ClientInstanceDto {
    detectorCount: number;
    measurementLogCount: number;
    isActive: boolean;
}
