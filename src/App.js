import React, {Component} from 'react';
import styles from './App.module.css';

import {Cards, Chart, CountryPicker } from './components/index';
import { fetchData } from './api/index';

import image from './images/corona_image.png';

class App extends Component {   

    state = {
        data: [],
        country: ''
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
    }

    render(){        
        const { data, country } = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="COVID-19" />
                <Cards country={country}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country} />                
            </div>
        );
    }
}

export default App;
