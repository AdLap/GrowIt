import './App.scss';
import {Home} from "./home/home";
import {Profile} from "./profile/profile"
import {Gallery} from "./gallery/gallery";
import {
    HashRouter,
    Route,
    Link,
    Switch,
} from 'react-router-dom';

function NotFound() {
    return (
        <>
            <h1>Strona nie istnieje</h1>
            <Link to='/'>Home</Link>
        </>
    );
}

function App() {
    return <HashRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile/:plantId' component={Profile}/>
            <Route path='/gallery' component={Gallery} />
            <Route component={NotFound}/>
        </Switch>
    </HashRouter>
}

export default App;
