import { useState } from 'react'
import data from "../srv/data/qas.json"
import Highcharts from 'highcharts';
import {
  HighchartsProvider,
} from "react-jsx-highcharts";

import MyChart from './components/MyChart'

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});


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
