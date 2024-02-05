import './App.css'
import { useState, useEffect, useRef, memo } from 'react'
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

const MyChart = memo(({ item }: { item: Item }) => {
  return (
    <HighchartsChart key={crypto.randomUUID()} plotOptions={{
      series: {
        stacking: "normal",
        animation: false,
        states: { hover: { enabled: false } }, // disable hover
      },
    }}>
      <Chart type="bar" />
      <Title>{item.q}</Title>
      <XAxis type="category" categories={["Celá populace", "Euronadšenci", "Příznivci EU", "Vlažní příznivci", "Nejistí", "Odpůrci EU", "Radikální odpůrci"]} />
      <YAxis>
        {item.a.map((answer, index) => {
          const name = answer[0].toString()
          const data = answer.slice(1, 7)
          return <BarSeries key={index} name={name} data={data} stacking='normal' />
        })}
      </YAxis>
    </HighchartsChart>
  )
})


function App() {
  const [page, setPage] = useState(5);
  const [items, setItems] = useState(data.slice(0, 4));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        setIsLoading(true);
        const newData = data.slice(page, page + 4);
        console.log(data);
        setItems((prev) => [...prev, ...newData]);
        setIsLoading(false);
      } catch (error) { }
    };
    getItems();
  }, [page]);

  window.onscroll = function (e) {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(page + 5);
    }
  };

  return (
    <div className="App">
      <HighchartsProvider Highcharts={Highcharts}>

        {items.map((item) =>
          <MyChart item={item} />)}
      </HighchartsProvider>
    </div>
  )
}

export default App
