import { ChartDataset, ChartType } from "chart.js";

export class ChartWrapper {
    chartData: ChartDataset[] = [];
    chartLabels: string[] = [];
    chartOptions = {
        responsive: true,
    };
    chartType: any = "bar";
}