//configs do react
import * as React from 'react';
import * as ReactDOM from "react-dom/client";

//importando o estilo geral (onde tem as diretivas tailwind)..
import('./styles/general.css')

//rotes components
import Home from "./main/home.jsx";
import Register from "./main/register.jsx";

//pinned components
import Header from "./components/main/navbar.jsx";

//configs do router
//createBrowserRouter - cria um objeto dos caminhos da aplicação
//RouterProvider - pega a view da rota atual e da display
import { createBrowserRouter, RouterProvider} from "react-router-dom";

//criando as rotas..
const modifiedrouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "sign-up",
    element: <Register/>,
  },
]);

const user = localStorage.getItem('user');

//criando o ambiente de display (adicionandoRouterProvider)..
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {user && <Header />} {/* Renderiza o Header se user estiver definido */}
    <RouterProvider router={modifiedrouter} /> {/*router=(seu objetos de definição de rotas) esse router pede o createBrowserRouter que vc vai usar*/}
  </React.StrictMode>
);

