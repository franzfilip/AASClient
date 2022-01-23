export interface MetricDto{
    id: string;
    clientInstanceId: string;
    measurementName: string;
    createdAt: number;
    counter: number;
    endedAt: number;
    measurement: number;
}