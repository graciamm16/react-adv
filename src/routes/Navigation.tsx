import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import logo from "../logo.svg";
import { routes } from './routes';
import { Suspense } from 'react';


export const Navigation = () => {
  return(
    <Suspense fallback={<span>Loading...</span>}>
        <Router>
            <div className="main-layout">
                <nav>
                    <img src={logo} alt="React Logo" />
                    <ul>
                        {
                            routes.map(({path, name}) => (
                                <li key={path}>
                                    <NavLink
                                        to={path} 
                                        activeClassName="nav-active" 
                                    >
                                        {name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

            <Switch>
                {
                    routes.map(({path, component: Component}) => (
                        <Route
                            key={path}
                            path={path}
                            render={() => <Component />}
                        />
                    ))
                }
                <Redirect to={routes[0].path}/>
            </Switch>
            </div>
        </Router>
    </Suspense>
  );
}