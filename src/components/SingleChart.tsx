import { useState, memo } from "react";
import {
    HighchartsChart,
    Chart,
    XAxis,
    YAxis,
    BarSeries,
    Legend,
    Tooltip
} from "react-jsx-highcharts";

import colors from "../assets/colors.json";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Item = {
    q: string;
    a: any[][];
};



const MyChart = memo(({ item, index, embed, select }: { item: Item, index: number, embed: boolean, select: string }) => {

    const [selected, setSelected] = useState(select)

    const thisChartColors: string[] = colors.filter((color) => color.questions.includes(index + 1))[0]?.colors || ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"]

    return <div className="flex flex-col items-center"
        key={crypto.randomUUID()}>
        <h2 className="text-xl font-bold text-center">{!embed ? `${index + 1}. ${item.q}` : `${item.q}`}</h2>
        <div className="pb-20 pt-2">
            <Select value={selected} onValueChange={e => setSelected(e)}>
                <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Euronadšenci</SelectItem>
                    <SelectItem value="2">Příznivci</SelectItem>
                    <SelectItem value="3">Vlažní příznivci</SelectItem>
                    <SelectItem value="4">Nejistí</SelectItem>
                    <SelectItem value="5">Odpůrci</SelectItem>
                    <SelectItem value="6">Skalní odpůrci</SelectItem>
                    <SelectItem value="0">Celá populace</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="w-full">
            <HighchartsChart plotOptions={{
                bar: {
                    pointWidth: 60,
                    pointPadding: 0,
                    groupPadding: 0.125,
                    events: {
                        legendItemClick: function () {
                            return false;
                        }
                    }
                },
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f} %',
                        borderWidth: 0,
                        style: {
                            textOutline: "none",
                        },
                    },
                    animation: false,
                    states: { hover: { enabled: false } }, // disable hover
                }
            }}>
                <Chart type="bar" height={176} animation={false} />
                <XAxis visible={false} type="category" categories={["Celá populace"]} labels={{ enabled: false }} />
                <YAxis max={100} gridLineWidth={0} labels={{ enabled: false }}>
                    {item.a.toReversed().map((answer, index) => {
                        return <BarSeries key={index} name={answer[0]} data={[answer[parseInt(selected) + 1]]} stacking='normal' color={thisChartColors[index]} />
                    })}
                </YAxis>
                <Legend reversed={true} verticalAlign='top' floating={false} />
                <Tooltip valueDecimals={1} valueSuffix=" %" />
            </HighchartsChart>
        </div>
    </div>
})

export default MyChart