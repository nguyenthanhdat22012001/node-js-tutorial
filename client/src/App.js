
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/layout/Home';
import Auth from './views/Auth';

function App() {
  return <Router>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={props => <Auth {...props} authRoute="login" />} />
        <Route exact path="/register" render={props => <Auth {...props} authRoute="register" />} />
    </Switch>
</Router>
}

export default App;
