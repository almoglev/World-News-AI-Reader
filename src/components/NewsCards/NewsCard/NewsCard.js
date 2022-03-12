// material UI styles
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'

import classNames from 'classnames'
import NewsImage from '../../../assets/news.png'
import useStyles from './styles.js'
import { useState, useEffect, createRef } from 'react'

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
    const classes = useStyles()
    const [elRefs, setElRefs] = useState([])
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50)

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_,j) => refs[j] || createRef()))
    }, [])

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle])
        }
    }, [i,activeArticle,elRefs])
    
    
    
  return (
    <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
        <CardActionArea href={url} target="_blank"> {/* clickable area */}
            <CardMedia className={classes.media} image={urlToImage || NewsImage} /> {/* image area */}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography> {/* typography for text styling */}
                <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
            <Button size="small" color="primary">Read More</Button>
            <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
        </CardActions>
    </Card>
  )
}

export default NewsCard