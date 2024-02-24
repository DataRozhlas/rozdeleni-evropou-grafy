import { memo } from "react";
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

type Item = {
    q: string;
    a: any[][];
};

const isMobile = window.innerWidth < 640;

const MyChart = memo(({ item, index, embed }: { item: Item, index: number, embed: boolean }) => {


    const thisChartColors: string[] = colors.filter((color) => color.questions.includes(index + 1))[0]?.colors || ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"]

    return (
        <div key={crypto.randomUUID()}>
            <h2 className="text-xl font-bold text-center">{!embed ? `${index + 1}. ${item.q}` : `${item.q}`}</h2>
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
                    animation: false,
                    states: { hover: { enabled: false } }, // disable hover
                }
            }}>
                <Chart type="bar" height={isMobile ? 115 : 176 * 0.7} marginLeft={120} marginBottom={0} marginRight={20} />
                <XAxis type="category" categories={["Celá populace"]} />
                <YAxis max={100} labels={{ enabled: false }}>
                    {item.a.toReversed().map((answer, index) => {
                        const name = answer[0].toString()
                        const data = answer.slice(1, 2)
                        return <BarSeries key={index} name={name} data={data} stacking='normal' color={thisChartColors[index]} />
                    })}
                </YAxis>
                <Legend reversed={true} verticalAlign='top' floating={false} />
                <Tooltip valueDecimals={1} valueSuffix=" %" />
            </HighchartsChart>
            <HighchartsChart plotOptions={{
                bar: {
                    pointPadding: 0,
                    groupPadding: 0.125,
                },
                series: {
                    animation: false,
                    states: { hover: { enabled: false } }, // disable hover
                }
            }}>
                <Chart type="bar" height={isMobile ? 240 : 320} margin={[0, 20, 50, 120]} />
                <XAxis type="category" categories={["Euronadšenci", "Příznivci", "Vlažní příznivci", "Nejistí", "Odpůrci", "Skalní odpůrci"]} />
                <YAxis max={100} labels={{ formatter: function () { return this.isLast ? `${this.value} %` : this.value.toString() } }}>
                    {item.a.toReversed().map((answer, index) => {
                        const name = answer[0].toString()
                        const data = answer.slice(2, 8)
                        return <BarSeries key={index} name={name} data={data} stacking='normal' color={thisChartColors[index]} />
                    })}
                </YAxis>
                <Tooltip valueDecimals={1} valueSuffix=" %" />
            </HighchartsChart>

        </div>
    )
})

export default MyChart