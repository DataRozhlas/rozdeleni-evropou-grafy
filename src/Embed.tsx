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

function Embed({ id }: { id: string }) {
    const index = parseInt(id) - 1
  return (
    <div className="Embed">
      <HighchartsProvider Highcharts={Highcharts}>
          <MyChart item={data[index]} index={index}/>
      </HighchartsProvider>
    </div>
    )
}

export default Embed