import React from 'react';
import axios from 'axios';
import Wallpaper from './Wallpaper';
import QuickSeach from './QuickSearch';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            quickSearchItems: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            url: 'http://localhost:https://limitless-headland-80936.herokuapp.com/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.locations })
            })
            .catch()

        axios({
            url: 'https://limitless-headland-80936.herokuapp.com/mealtypes',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ quickSearchItems: res.data.mealTypes })
            })
            .catch()
    }

    render() {
        const { locations, quickSearchItems } = this.state;
        return (
            <div>
                <Wallpaper locationsData={locations} />
                <QuickSeach quickSearchItemsData={quickSearchItems} />
            </div>
        )
    }
}

export default Home;
