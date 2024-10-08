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
import ForgetPassword from "./main/forget_password.jsx";
import VerifyForgetPassword from "./main/token_user.jsx";
import ChangePassword from "./main/change_password.jsx";
import Feed from "./main/feed.jsx";
import MyProfile from "./main/profile.jsx";
import Explore from "./main/explore.jsx";
import About from "./main/about.jsx";

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
    path: "forget-password",
    element: (
      <Guest auth={user}>
        <ForgetPassword/>
      </Guest>
    )
  },
  {
    path: "verify/forget-password",
    element: (
      <Guest auth={user}>
        <VerifyForgetPassword/>
      </Guest>
    )
  },
  {
    path: "change-password",
    element: (
      <Guest auth={user}>
        <ChangePassword/>
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
  {
    path: "profile/:nick",
    element: (
      <Auth auth={user}>
        <MyProfile />
      </Auth>
    )
  },
  {
    path: "explore",
    element: (
      <Auth auth={user}>
        <Explore/>
      </Auth>
    )
  },
  {
    path: "about",
    element: (
      <Auth auth={user}>
        <About/>
      </Auth>
    )
  }
]);

//criando o ambiente de display (adicionandoRouterProvider)..
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Suspense fallback={"LOADING..."} >
    {user && <Header />} {/* Renderiza o Header se user estiver definido */}
    <RouterProvider router={modifiedrouter} /> {/*router=(seu objetos de definição de rotas) esse router pede o createBrowserRouter que vc vai usar*/}
  </React.Suspense >
);

