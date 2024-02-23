import { useEffect } from "react";
import data from "../srv/data/qas.json"
import Highcharts from 'highcharts';
import ilu from "./assets/rozdeleni-evropou.svg"
import {
  HighchartsProvider,
} from "react-jsx-highcharts";

import SingleChart from './components/SingleChart'

import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";


Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

function EmbedSingle({ id, select }: { id: string, select: string }) {
  const index = parseInt(id) - 1

  const { containerRef, postHeightMessage } = usePostMessageWithHeight(`rozdeleni-evropou-graf-${id}-${select}`);

  useEffect(() => {
    postHeightMessage();
  }, []);

  if (id !== "1") return (
    <div ref={containerRef} className="Embed">
      <HighchartsProvider Highcharts={Highcharts}>
        <SingleChart item={data[index]} index={index} embed={true} select={select} />
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