import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Battle from './pages/Battle';
import ViewBattles from './pages/ViewBattles';
import Locations from './pages/Locations'; 
import Stats from './pages/Stats';
import NavBar from './components/NavBar';
import UpdateBattle from './pages/UpdateBattle';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
      <Route path='/' exact>
        <Home/>
      </Route>
      <Route path='/battles'>
        <ViewBattles/>
      </Route>
      <Route path='/battle/:index'>
        <Battle/>
      </Route>
      <Route path='/updateBattle/:index'>
        <UpdateBattle/>
      </Route>
      {/* <Route path='/locations'>
        <Locations/>
      </Route>
      <Route path='/stats'>
        <Stats/>
      </Route> */}
      </Switch>
    </div>
  );
}

export default App;
