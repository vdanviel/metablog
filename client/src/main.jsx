//configs do react
import * as React from 'react';
import * as ReactDOM from "react-dom/client";

//onde tem as diretivas tailwind).
import('./styles/tailwind.css');
import('./styles/default.css')

//rotes components
import Home from "./main/home.jsx";
import Register from "./main/register.jsx";
import Login from "./main/login.jsx";
import Feed from "./main/feed.jsx";

//pinned components
import Header from "./components/main/navbar.jsx";
import Auth from "./components/management/auth.jsx";
import Guest from "./components/management/guest.jsx";

//configs do router
//createBrowserRouter - cria um objeto dos caminhos da aplicação
//RouterProvider - pega a view da rota atual e da display
import { createBrowserRouter, RouterProvider} from "react-router-dom";

const user = localStorage.getItem('user');

//criando as rotas..
const modifiedrouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Guest auth={user}>
        <Home/>
      </Guest>
    )
  },
  {
    path: "sign-up",
    element: (
      <Guest auth={user}>
        <Register/>
      </Guest>
  )
  },
  {
    path: "sign-in",
    element: (
      <Guest auth={user}>
        <Login/>
      </Guest>
    )
  },
  {
    path: "feed",
    element: (
      <Auth auth={user}>
        <Feed/>
      </Auth>
    )
  },
]);

//criando o ambiente de display (adicionandoRouterProvider)..
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {user && <Header />} {/* Renderiza o Header se user estiver definido */}
    <RouterProvider router={modifiedrouter} /> {/*router=(seu objetos de definição de rotas) esse router pede o createBrowserRouter que vc vai usar*/}
  </React.StrictMode>
);

