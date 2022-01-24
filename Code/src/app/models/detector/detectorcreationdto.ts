export interface DetectorCreationDto{
    name: string,
    minValue?: number,
    maxValue?: number,
    detectorInterval: number,
    fromTime?: number,
    untilTime?: number,
    lastMeasures?: number,
    listOperation: string,
    maxOutLiers?: number,
    detectorActionId: string,
    measurementName: string,
    clientInstanceId: string,
    isActive: boolean
}