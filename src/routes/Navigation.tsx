import { BrowserRouter, Navigate } from "react-router-dom";
import { Route, Routes, NavLink } from "react-router-dom";
import logo from "../logo.svg";
import {routes} from './routes';
import { Suspense } from "react";


export const Navigation = () => {
  return(
    /*
        1. Maneja la carga de componentes de manera asíncrona.
        2. Mejora la experiencia del usuario al proporcionar una indiciación visual mientras espera la carga de los componentes.
    */
    <Suspense fallback={<span>Loadings...</span>}>
        <BrowserRouter>
            <div className="main-layout">
                <nav>
                    <img src={logo} alt="React Logo" />
                    <ul>
                        {/* TODO: crear navlinks dinámicos */}
                        {
                            routes.map(({to, name}) => (
                                <li key={to}>
                                    <NavLink
                                        to={to} 
                                        className={({isActive}) => isActive ? 'nav-active' : ''}
                                    >
                                        {name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <Routes>
                    {
                        routes.map(({path, Component}) => (
                            <Route
                                key={path} 
                                path={path} 
                                element={<Component />}
                            />
                        ))
                    }

                    <Route path="/*" element={<Navigate to={routes[0].to} replace/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    </Suspense>
  );
}