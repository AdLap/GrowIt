import './App.scss';
import {Home} from "./home/home";
import {Profile} from "./profile/profile"
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
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
            <Route component={NotFound}/>
        </Switch>
    </HashRouter>
}

export default App;
