import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const url = 'https://covid19.mathdro.id/api';


export const fetchCardsData = async (country) => {

    let fullUrl = url;

    if(country){
        fullUrl = `${url}/countries/${country}`;
    }

    try {
        const { data: { confirmed, deaths, lastUpdate, recovered }} = await axios.get(fullUrl);
        
        const cardData = [
            {
                id: uuidv4(),
                cardTitle: 'Infected',
                cardDescription: 'Number of active cases of COVID-19',
                data: confirmed.value,
                lastDate: lastUpdate
            },
            {
                id: uuidv4(),
                cardTitle: 'Recovered',
                cardDescription: 'Number of recovered people from COVID-19',
                data: recovered.value,
                lastDate: lastUpdate
            },
            {
                id: uuidv4(),
                cardTitle: 'Deaths',
                cardDescription: 'Number of dead people from COVID-19',
                data: deaths.value,
                lastDate: lastUpdate
            }
        ];
        return cardData;        
        
    } catch (error) {
        console.log(error);        
    }
}

export const fetchData = async (country) => {
    let fullUrl = url;

    if(country){
        fullUrl = `${url}/countries/${country}`;
    }

    try {
        const { data: { confirmed, deaths, lastUpdate, recovered } } = await axios.get(fullUrl);

        const resultObject = {
            name: new Date(lastUpdate).toDateString(),
            infected: confirmed.value,
            recovered: recovered.value,
            deaths: deaths.value
        };

        const chartDataArr = [resultObject];

        return chartDataArr;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);
        const chartData = data.map(dailyItem => ({
            name: dailyItem.reportDate,
            confirmed: dailyItem.confirmed.total,
            deaths: dailyItem.deaths.total
        }));
        
        return chartData;
    } catch (error) {
        console.log(error);        
    }    
}

export const fetchCountries = async () => {
    try {
        const {data: { countries }} = await axios.get(`${url}/countries`);
        //console.log(data);
        const countriesArray = countries.map(country => country.name);
        return countriesArray;
    } catch (error) {
        console.log(error);
    }
}