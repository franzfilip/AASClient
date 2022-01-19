export interface CreateMeasurementLog {
    measurementName: string;
    clientInstanceId: string;
    createdAt: number;
    type: string;
    message: string;
}
