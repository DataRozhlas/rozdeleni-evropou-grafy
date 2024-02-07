import './App.css'
import { useState, memo } from 'react'
import data from "../srv/data/qas.json"
import Highcharts from 'highcharts';
import {
  HighchartsProvider,
  HighchartsChart,
  Chart,
  Title,
  XAxis,
  YAxis,
  BarSeries,
  Legend,
} from "react-jsx-highcharts";

type Item = {
  q: string;
  a: any[][];
};


Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const MyChart = memo(({ item, index}: { item: Item, index: number }) => {
  return (
    <HighchartsChart key={crypto.randomUUID()} plotOptions={{
      series: {
        stacking: "normal",
        animation: false,
        states: { hover: { enabled: false } }, // disable hover
      },
    }}>
      <Chart type="bar" />
      <Title>{`${index+1}. ${item.q}`}</Title>
      <XAxis type="category" categories={["Celá populace", "Euronadšenci", "Příznivci EU", "Vlažní příznivci", "Nejistí", "Odpůrci EU", "Radikální odpůrci"]} />
      <YAxis max={100}>
        {item.a.map((answer, index) => {
          const name = answer[0].toString()
          const data = answer.slice(1, 8)
          return <BarSeries key={index} name={name} data={data} stacking='normal' />
        })}
      </YAxis>
      <Legend reversed={true} verticalAlign='top'/>
    </HighchartsChart>
  )
})


function App() {
  const [page, setPage] = useState(5);
  const [items, setItems] = useState(data.slice(0, 5));

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prev) => prev + 5);
      setItems((prev) => [...prev, ...data.slice(page, page + 5)]);

    }
  };

  return (
    <div className="App">
      <HighchartsProvider Highcharts={Highcharts}>

        {items.map((item, index) =>
          <MyChart item={item} index={index}/>)}
      </HighchartsProvider>
    </div>
  )
}

export default App
