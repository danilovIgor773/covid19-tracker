import React, {Component} from 'react';
import { Grid } from '@material-ui/core';

import { fetchCardsData } from '../../api';

import SimpleCard from './SimpleCard/SimpleCard';
import styles from './Cards.module.css';

class Cards extends Component{
    state = {
        data: [],
    }    

    async componentDidMount () {
        const fetchedData = await fetchCardsData();
        this.setState({data: fetchedData});
    }

    async componentDidUpdate(prevProps){
        if(this.props.country !== prevProps.country){
            const fetchedData = await fetchCardsData(this.props.country);
            this.setState({data: fetchedData});
        }        
    }

    render(){
        let cards = null;

        if(!this.state.data){
            cards = (<p style={{"textTransform": "uppercase", "fontWeight": "bold"}}>Loading...</p>);
        }else{
            cards = this.state.data.map(card => 
                <SimpleCard 
                    key={card.id}
                    cardTitle={card.cardTitle}
                    fetchedData={card.data}
                    lastDate={card.lastDate}
                    description={card.cardDescription}
                />
            )
        }

        return (
            <div className={styles.container}>
                <Grid container spacing={3} justify="center">
                    {cards}
                </Grid>
            </div>
        )
    }
}

export default Cards;

