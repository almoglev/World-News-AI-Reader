// material UI styles
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'

import NewsImage from '../../../assets/news.png'
import useStyles from './styles.js'

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i }) => {
    const classes = useStyles()
    
  return (
    <Card className={classes.card}>
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