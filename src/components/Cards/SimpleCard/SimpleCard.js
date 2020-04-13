import React from 'react';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './SimpleCard.module.css';

const SimpleCard = ({cardTitle, fetchedData, lastDate, description}) => {
    return (        
        <Grid item component={Card} xs={12} md={3} className={cx(styles.Card, styles[cardTitle])}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>{cardTitle}</Typography>
                <Typography variant="h5">
                    <CountUp start={0} end={fetchedData} duration={2.5} separator="," />
                </Typography>
                <Typography color="textSecondary">{new Date(lastDate).toDateString()}</Typography>
                <Typography variant="body2">{description}</Typography>                    
            </CardContent>                            
        </Grid>     
    )
}

export default SimpleCard;