import { useState } from 'react'
import data from "../srv/data/qas.json"
import ilu from "./assets/rozdeleni-evropou.svg"
import Highcharts from 'highcharts';
import {
  HighchartsProvider,
} from "react-jsx-highcharts";

import MyChart from './components/MyChart'

import { Button } from './components/ui/button';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});


function App() {
  const [page, setPage] = useState(5);
  const [items, setItems] = useState(data.slice(0, 5));
  const { toast } = useToast()

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

        {items.map((item, index) => {
          if (index !== 0) return (
            <div className={"pb-12 flex flex-col"}>
              <MyChart item={item} index={index} embed={false} />
              <Button className={"max-w-md self-center"} variant={"outline"} onClick={() => { toast({ title: "Embed kód máte zkopírovaný ve schránce", description: "Pomocí Ctrl+V ho můžete vložit do článku" }); navigator.clipboard.writeText(`<iframe src="https://data.irozhlas.cz/rozdeleni-evropou-grafy/?id=${index + 1}" scrolling="no" frameborder="0" allowtransparency="true" style="width: 0; min-width: 100% !important;" height="730" id="rozdeleni-evropou-graf-${index + 1}"></iframe> <script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["cro-embed-height"])for(var e in a.data["cro-embed-height"])if("rozdeleni-evropou-graf-${index + 1}"==e){var d=document.querySelector("#rozdeleni-evropou-graf-${index + 1}");d&&(d.style.height=a.data["cro-embed-height"][e]+"px")}});</script>`) }}>{`Zkopírovat embed kód grafu ${index + 1}`}</Button>
            </div>)
          if (index === 0) return (
            <div className={"pb-12 flex flex-col max-w-screen-md mx-auto"}>
            <h2 className="text-xl font-bold text-center">{`1. ${item.q}`}</h2>
            <img src={ilu} alt="Rozděleni Evropou - segmentace" />
            <Button className={"max-w-md self-center"} variant={"outline"} onClick={() => { toast({ title: "Embed kód máte zkopírovaný ve schránce", description: "Pomocí Ctrl+V ho můžete vložit do článku" }); navigator.clipboard.writeText(`<iframe src="https://data.irozhlas.cz/rozdeleni-evropou-grafy/?id=${index + 1}" scrolling="no" frameborder="0" allowtransparency="true" style="width: 0; min-width: 100% !important;" height="730" id="rozdeleni-evropou-graf-${index + 1}"></iframe> <script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["cro-embed-height"])for(var e in a.data["cro-embed-height"])if("rozdeleni-evropou-graf-${index + 1}"==e){var d=document.querySelector("#rozdeleni-evropou-graf-${index + 1}");d&&(d.style.height=a.data["cro-embed-height"][e]+"px")}});</script>`) }}>{`Zkopírovat embed kód grafu ${index + 1}`}</Button>
            </div>
          )
        })}
      </HighchartsProvider>
      <Toaster />
    </div>
  )
}

export default App
