import { useEffect } from "react";
import data from "../srv/data/qas.json"
import Highcharts from 'highcharts';
import ilu from "./assets/rozdeleni-evropou.svg"
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

function EmbedSingle({ id, select }: { id: string, select: string}) {
  const index = parseInt(id) - 1

  const { containerRef, postHeightMessage } = usePostMessageWithHeight(`rozdeleni-evropou-graf-${id}`);

  useEffect(() => {
    postHeightMessage();
  }, []);

  if (id !== "1") return (
    <div ref={containerRef} className="Embed">
      <HighchartsProvider Highcharts={Highcharts}>
        <div>{select}</div>
        <MyChart item={data[index]} index={index} embed={true} />
      </HighchartsProvider>
    </div>
  )
  if (id === "1") return (
    <div ref={containerRef} className="Embed">
      <img src={ilu} alt="Rozdělení Evropou - segmentace" />
    </div>
  )

}

export default EmbedSingle;