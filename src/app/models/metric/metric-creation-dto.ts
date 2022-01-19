export interface MetricCreationDto {
    clientInstanceId: string,
    measurementName: string,
    createdAt: number,
    counter?: number,
    endedAt?: number,
    measurement?: number
}
