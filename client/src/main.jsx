//configs do react
import React, { lazy, Suspense } from 'react';
import * as ReactDOM from "react-dom/client";
import { LogoLoading } from "./loading/logoloading.jsx";

//importando o estilo geral (onde tem as diretivas tailwind)..
import('./styles/general.css')

//configs do router
//createBrowserRouter - cria um objeto dos caminhos da aplicação
//RouterProvider - pega a view da rota atual e da display
import { createBrowserRouter, RouterProvider} from "react-router-dom";

/*CHAMANDO COMPONENTES EM UMA LINHA NO createBrowserRouter()..

  para isso eu usarei a função lazy do React que careegar componentes de forma assincrona a parte da promisse do arquivo,
  o qual ele recupera o export default que é considerado a função do componente
*/
const loadComponent = (componentPath) => {

  const Component = lazy(() => import(`${componentPath}`));//aqui ele esta pegando o componente e o tornando assíncrono..

  return (
    <Suspense fallback={LogoLoading}>{/*aqui estamos usando o componente Suspense que é como se fosse o "loading" do carregamento do assíncrono. oque vai aparecer nesse "loading", esta definido em "fallback="*/}
      <Component />{/*ele recupera o componente passado no parametro e joga aqui*/}
    </Suspense>
  );

};

//criando as rotas..
const modifiedrouter = createBrowserRouter([
  {
    path: "/",
    element: loadComponent('./main/home.jsx'),
  },
]);

//criando o ambiente de display (adicionandoRouterProvider)..
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={modifiedrouter} /> {/*router=(seu objetos de definição de rotas) esse router pede o createBrowserRouter que vc vai usar*/}
  </React.StrictMode>
);