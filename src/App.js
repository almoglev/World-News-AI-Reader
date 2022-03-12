import { useEffect, useState } from "react"
import alanBtn from "@alan-ai/alan-sdk-web"
import NewsCards from "./components/NewsCards/NewsCards"
import Logo from './assets/logo.png'
import useStyles from './styles.js'
import wordsToNumbers from 'words-to-numbers'
import { Typography } from "@material-ui/core"

const alanKey = 'f1a329f1a7aa78f8608827a4e65848d12e956eca572e1d8b807a3e2338fdd0dc/stage'

function App() {
  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)
  const classes = useStyles()

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Article with this number does not exist. Please try again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Article with this number does not exist. Please try again...');
          }
        }
      },
    });
  }, []);
  
  return (
    <div>
      <div className={classes.logoContainer}>
           {newsArticles.length ? (
        <div className={classes.infoContainer}>
          <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
          <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
        </div>
      ) : null}
        <img src={Logo} className={classes.imgLogo} alt="logo"></img>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>

         {!newsArticles.length ? (
      <div className={classes.footer}>
        <Typography variant="body1" component="h2">
          Created by Almog Lev
          (<a className={classes.link} href="https://www.linkedin.com/in/almoglev/" target='_blank'>LinkedIn</a> ,
          <a className={classes.link} href="https://www.github.com/almoglev" target='_blank'> GitHub</a>)
        </Typography>
      </div>
    ) : null}

    </div>
  );
}

export default App;
