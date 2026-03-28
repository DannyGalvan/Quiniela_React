import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "../containers/Layout";
import { AuthProvider } from "../context/authContext";
import { ThemeProvider } from "../context/themeContext";
import { SERVERPATH } from "../config/configuracion";
import store from "../redux/store";

const Loading = lazy(()=>import('../pages/Loading/Loading'));
const NotFound = lazy(() => import("../pages/Error/NotFound"));
const ProtectedRoute = lazy(()=>import('./ProtectedRoute'));
const ProtectedLogin = lazy(()=>import('./ProtectedLogin'));
const ProtectedUnautorized = lazy(()=>import('./ProtectedUnautorized'));
const Login = lazy(() => import("../pages/Login/Login"));
const NewUser = lazy(()=>import('../pages/Login/NewUser'));
const Home = lazy(() => import("../pages/Home"));
const MyInfo = lazy(()=>import("../pages/MyInfo"));
const MyResult = lazy(()=>import("../pages/MyResult"));
const Matches = lazy(()=>import('../pages/Matches'));
const PostGroup = lazy(()=>import('../pages/PostGroup'));
const CompareResult = lazy(()=>import('../pages/CompareResult'));
const CompareGroup = lazy(()=>import('../pages/CompareGroup'));
const TableResults = lazy(()=>import('../pages/TableResults'));
const TableResultsCountry = lazy(()=>import('../pages/TableResultsCountry'));
const Results = lazy(()=>import('../pages/Results'));
const ResultsFinales = lazy(()=>import('../pages/ResultsFinales'));
const Instructions = lazy(()=>import('../pages/Instructions'));
const MantenimientoPartidos = lazy(()=>import('../pages/MantenimientoPartidos'));
const MantenimientoFinales = lazy(()=>import('../pages/MantenimientoFinales'));
const PostFinales = lazy(()=>import('../pages/PostFinales'));
const MyInfoFinales = lazy(()=>import('../pages/MyInfoFinales'));
const CompareFinales = lazy(()=>import('../pages/CompareFinales'));
const TableResultsFinales = lazy(()=>import('../pages/TableResultsFinales'));
const TableResultsCountryFinales = lazy(()=>import('../pages/TableResultsCountryFinales'));

const App = () => {
  return (
    <BrowserRouter>
     <ThemeProvider>
     <AuthProvider>
      <Provider store={store}>   
        <Suspense fallback={<Loading />}>        
              <Layout>
                <Routes basename={SERVERPATH}>              
                  <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path={`/post-group`} element={<ProtectedRoute><PostGroup /></ProtectedRoute>} />
                  <Route path={`/matches`} element={<ProtectedRoute><Matches /></ProtectedRoute>} />
                  <Route path={`/post-finales`} element={<ProtectedRoute><PostFinales /></ProtectedRoute>} />
                  <Route path={`/my-info`} element={<ProtectedRoute><MyInfo /></ProtectedRoute>} />
                  <Route path={`/my-result`} element={<ProtectedRoute><MyResult /></ProtectedRoute>} />
                  <Route path={`/comparation`} element={<ProtectedRoute><CompareResult /></ProtectedRoute>} />
                  <Route path={`/comparation-group`} element={<ProtectedRoute><CompareGroup /></ProtectedRoute>} />
                  <Route path={`/my-info-finales`} element={<ProtectedRoute><MyInfoFinales /></ProtectedRoute>} />
                  <Route path={`/comparation-finales`} element={<ProtectedRoute><CompareFinales /></ProtectedRoute>} />
                  <Route path={`/table-result-finales`} element={<ProtectedRoute><TableResultsFinales /></ProtectedRoute>} />
                  <Route path={`/table-result-country-finales`} element={<ProtectedUnautorized><TableResultsCountryFinales /></ProtectedUnautorized>} />
                  <Route path={`/table-result`} element={<ProtectedRoute><TableResults /></ProtectedRoute>} />
                  <Route path={`/table-result-country`} element={<ProtectedUnautorized><TableResultsCountry /></ProtectedUnautorized>} />
                  <Route path={`/results`} element={<ProtectedUnautorized><Results /></ProtectedUnautorized>} />
                  <Route path={`/results-finales`} element={<ProtectedUnautorized><ResultsFinales /></ProtectedUnautorized>} />
                  <Route path={`/mantenimiento-partidos`} element={<ProtectedUnautorized><MantenimientoPartidos /></ProtectedUnautorized>} />
                  <Route path={`/mantenimiento-finales`} element={<ProtectedUnautorized><MantenimientoFinales /></ProtectedUnautorized>} />
                  <Route path={`/instructions`} element={<ProtectedRoute><Instructions /></ProtectedRoute>} />
                  <Route path={`/login`} element={<ProtectedLogin><Login /></ProtectedLogin>} />
                  <Route path={`/new_user`} element={<ProtectedLogin><NewUser /></ProtectedLogin>} />
                  <Route path={`/not_found`} element={<NotFound Numero={`Error 404`} Mensaje='La Pagina Que Buscas No Existe'/>} />
                  <Route path={`/expired`} element={<NotFound Numero={`Error 401`} Mensaje='La Sesion Ha Expirado'/>} />
                  <Route path={`/unauthorized`} element={<NotFound Numero={`Error 403`} Mensaje='No Tienes Permiso Para Visualizar Este Contenido'/>} />
                  <Route path="*"element={ <NotFound  Numero={`Error 404`}  Mensaje="La Pagina Que Buscas No Existe"/>}/>            
                </Routes>            
              </Layout>       
          </Suspense>
        </Provider>
     </AuthProvider>
     </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
