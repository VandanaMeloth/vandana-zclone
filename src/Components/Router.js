import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Filter from './Filter';
import Details from './Details';
import Header from './Header';
import Footer from './Footer';


function Router() {
    return (
        <BrowserRouter>
        <Header/>
        <Switch>
            
            <Route exact path="/" component={Home} />
            <Route path="/filter" component={Filter} />
            <Route path="/details" component={Details} />
        </Switch>
            <Footer/>
        </BrowserRouter>
    )
}

export default Router;