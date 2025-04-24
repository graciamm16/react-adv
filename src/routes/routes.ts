import {JSX, lazy, LazyExoticComponent} from 'react';

type JSXComponent = () => JSX.Element;

interface Route{
    path: string;
    component: LazyExoticComponent<JSXComponent> | JSXComponent; //() => JSX.Element;
    name: string;
    children?: Route[];
}

const LazyPage1 = lazy(() => import(/*webpackChunkName:"LazyPage1"*/'../1-lazyload/pages/LazyPage1'));
const LazyPage2 = lazy(() => import(/*webpackChunkName:"LazyPage2"*/'../1-lazyload/pages/LazyPage2'));
const LazyPage3 = lazy(() => import(/*webpackChunkName:"LazyPage3"*/'../1-lazyload/pages/LazyPage3'));

export const routes: Route[] = [
    {
        path: '/lazy1',
        component: LazyPage1,
        name: 'Lazypage-1'
    },
    {
        path: '/lazy2',
        component: LazyPage2,
        name: 'Lazypage-2'
    },
    {
        path: '/lazy3',
        component: LazyPage3,
        name: 'Lazypage-3'
    }
]