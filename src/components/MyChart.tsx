import { memo } from "react";
import {
    HighchartsChart,
    Chart,
    Title,
    XAxis,
    YAxis,
    BarSeries,
    Legend,
} from "react-jsx-highcharts";

import colors from "../assets/colors.json";

type Item = {
    q: string;
    a: any[][];
};

const MyChart = memo(({ item, index }: { item: Item, index: number }) => {
    const thisChartColors : string[] = colors.filter((color) => color.questions.includes(index + 1))[0]?.colors?.toReversed() || ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"]

    return (
        <HighchartsChart key={crypto.randomUUID()} plotOptions={{
            series: {
                stacking: "normal",
                animation: false,
                states: { hover: { enabled: false } }, // disable hover
            },
        }}>
            <Chart type="bar" />
            <Title>{`${index + 1}. ${item.q}`}</Title>
            <XAxis type="category" categories={["Celá populace", "Euronadšenci", "Příznivci EU", "Vlažní příznivci", "Nejistí", "Odpůrci EU", "Radikální odpůrci"]} />
            <YAxis max={100}>
                {item.a.map((answer, index) => {
                    const name = answer[0].toString()
                    const data = answer.slice(1, 8)
                    return <BarSeries key={index} name={name} data={data} stacking='normal' color={thisChartColors[index]}/>
                })}
            </YAxis>
            <Legend reversed={true} verticalAlign='top' />
        </HighchartsChart>
    )
})

export default MyChart