import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import LandingPage from './Componentes/landingPage/LadingPage';
import Home from './Componentes/home/Home';
import RecipeCreate from '../src/Componentes/recipeCreate/RecipeCreate';
import Detail from './Componentes/detail/Detail';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/"component={LandingPage}/>
        <Route exact path = '/home' component= {Home}/> 
        <Route exact path ='/recipes/:id' component={Detail}/>
        <Route exact path ='/recipe' component={RecipeCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
