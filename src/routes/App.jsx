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
                <Routes>              
                  <Route path={`${SERVERPATH}`} element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/post-group`} element={<ProtectedRoute><PostGroup /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/matches`} element={<ProtectedRoute><Matches /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/post-finales`} element={<ProtectedRoute><PostFinales /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/my-info`} element={<ProtectedRoute><MyInfo /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/my-result`} element={<ProtectedRoute><MyResult /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/comparation`} element={<ProtectedRoute><CompareResult /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/comparation-group`} element={<ProtectedRoute><CompareGroup /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/my-info-finales`} element={<ProtectedRoute><MyInfoFinales /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/comparation-finales`} element={<ProtectedRoute><CompareFinales /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/table-result-finales`} element={<ProtectedRoute><TableResultsFinales /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/table-result-country-finales`} element={<ProtectedUnautorized><TableResultsCountryFinales /></ProtectedUnautorized>} />
                  <Route path={`${SERVERPATH}/table-result`} element={<ProtectedRoute><TableResults /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/table-result-country`} element={<ProtectedUnautorized><TableResultsCountry /></ProtectedUnautorized>} />
                  <Route path={`${SERVERPATH}/results`} element={<ProtectedUnautorized><Results /></ProtectedUnautorized>} />
                  <Route path={`${SERVERPATH}/results-finales`} element={<ProtectedUnautorized><ResultsFinales /></ProtectedUnautorized>} />
                  <Route path={`${SERVERPATH}/mantenimiento-partidos`} element={<ProtectedUnautorized><MantenimientoPartidos /></ProtectedUnautorized>} />
                  <Route path={`${SERVERPATH}/mantenimiento-finales`} element={<ProtectedUnautorized><MantenimientoFinales /></ProtectedUnautorized>} />
                  <Route path={`${SERVERPATH}/instructions`} element={<ProtectedRoute><Instructions /></ProtectedRoute>} />
                  <Route path={`${SERVERPATH}/login`} element={<ProtectedLogin><Login /></ProtectedLogin>} />
                  <Route path={`${SERVERPATH}/new_user`} element={<ProtectedLogin><NewUser /></ProtectedLogin>} />
                  <Route path={`${SERVERPATH}/not_found`} element={<NotFound Numero={`Error 404`} Mensaje='La Pagina Que Buscas No Existe'/>} />
                  <Route path={`${SERVERPATH}/expired`} element={<NotFound Numero={`Error 401`} Mensaje='La Sesion Ha Expirado'/>} />
                  <Route path={`${SERVERPATH}/unauthorized`} element={<NotFound Numero={`Error 403`} Mensaje='No Tienes Permiso Para Visualizar Este Contenido'/>} />
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
