"use client";

import { ResponsiveLine } from "@nivo/line";

interface Props {
    data?: { x: number | string; y: number }[];
}

export default function WeightChart({ data }: Props) {
    const chartData = [
        {
            id: "Jimmy",
            data: data ?? [
                { x: 1, y: 87.3 },
                { x: 2, y: 87.0 },
                { x: 3, y: 86.5 },
                { x: 4, y: 85.8 },
                { x: 5, y: 85.0 },
                { x: 6, y: 84.6 },
                { x: 7, y: 84.0 },
            ],
        },
    ];

    return (
        <div className="h-[30vh]">
            <ResponsiveLine
                data={chartData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                curve="basis"
                axisBottom={{ legend: 'Days', legendOffset: 36 }}
                axisLeft={{ legend: 'Weight (kg)', legendOffset: -60 }}
                enableGridX={false}
                enablePoints={false}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'seriesColor' }}
                pointLabelYOffset={-12}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        translateX: 100,
                        itemWidth: 80,
                        itemHeight: 22,
                        symbolShape: 'circle'
                    }
                ]}
            />
        </div>
    );
}
