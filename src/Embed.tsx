import { useEffect } from "react";
import data from "../srv/data/qas.json"
import Highcharts from 'highcharts';
import {
  HighchartsProvider,
} from "react-jsx-highcharts";

import MyChart from './components/MyChart'

import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";


Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

function Embed({ id }: { id: string }) {
    const index = parseInt(id) - 1

    const { containerRef, postHeightMessage } = usePostMessageWithHeight(`rozdeleni-evropou-graf-${id}`);

    useEffect(() => {
        postHeightMessage();
    }, []);

  return (
    <div ref={containerRef} className="Embed">
      <HighchartsProvider Highcharts={Highcharts}>
          <MyChart item={data[index]} index={index} embed={true}/>
      </HighchartsProvider>
    </div>
    )
}

export default Embed