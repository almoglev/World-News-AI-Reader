import { useEffect, useState } from "react"
import alanBtn from "@alan-ai/alan-sdk-web"

const alanKey = 'f1a329f1a7aa78f8608827a4e65848d12e956eca572e1d8b807a3e2338fdd0dc/stage'

function App() {

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if(command === 'newHeadlines') {
          console.log(articles)
        }
      }
    })
  }, [])
  
  return (
    <div className="App">
      <h1> Alan AI News Application</h1>
    </div>
  );
}

export default App;
