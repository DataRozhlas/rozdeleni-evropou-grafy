import { memo } from "react";
import {
    HighchartsChart,
    Chart,
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
    const thisChartColors: string[] = colors.filter((color) => color.questions.includes(index + 1))[0]?.colors?.toReversed() || ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"]

    return (
        <>
        <h2 className="text-xl font-bold text-center">{`${index + 1}. ${item.q}`}</h2>
        <HighchartsChart key={crypto.randomUUID()} plotOptions={{
            bar: {
                pointWidth: 100,
            },
            series: {
                animation: false,
                states: { hover: { enabled: false } }, // disable hover
            }
        }}>
            <Chart type="bar" height={176} marginLeft={120} marginBottom={0} marginRight={15}/>
            <XAxis type="category" categories={["Celá populace"]} />
            <YAxis max={100} labels={{enabled: false}}>
                {item.a.map((answer, index) => {
                    const name = answer[0].toString()
                    const data = answer.slice(1, 2)
                    return <BarSeries key={index} name={name} data={data} stacking='normal' color={thisChartColors[index]} />
                })}
            </YAxis>
            <Legend reversed={true} verticalAlign='top' floating={false} />
        </HighchartsChart>
        <HighchartsChart key={crypto.randomUUID()} plotOptions={{
            bar: {
                pointPadding: 0,
                groupPadding: 0.125,
            },
            series: {
                animation: false,
                states: { hover: { enabled: false } }, // disable hover
            }
        }}>
            <Chart type="bar" height={320} margin={[0,15,50,120]}/>
            <XAxis type="category" categories={["Euronadšenci", "Příznivci EU", "Vlažní příznivci", "Nejistí", "Odpůrci EU", "Radikální odpůrci"]} />
            <YAxis max={100} labels={{formatter: function() {return this.isLast ? `${this.value} %` : this.value.toString() }}}>
                {item.a.map((answer, index) => {
                    const name = answer[0].toString()
                    const data = answer.slice(2, 8)
                    return <BarSeries key={index} name={name} data={data} stacking='normal' color={thisChartColors[index]} />
                })}
            </YAxis>
        </HighchartsChart>
       
        </>
    )
})

export default MyChart