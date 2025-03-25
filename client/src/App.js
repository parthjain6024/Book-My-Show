import logo from './logo.svg';
import './App.css';
import SignIn from './components/Signin';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieList from './components/MovieList';
import DashboardLayout from './components/layouts/DashboardLayout';
import TheatreList from './components/TheatreList';
import Show from './components/Show';
import MovieDetail from './components/MovieDetail'
import ShowDetail from './components/ShowDetail';
import ShowList from './components/ShowList';

const router = createBrowserRouter([
  {
    path:"/",
    element: <DashboardLayout title={'Home Page'}>Dashboard!</DashboardLayout>
  },
  {
    path:"/signin",
    element: <SignIn/>
  },
  {
    path:"/theatres",
    element: <DashboardLayout title={'Theatres'}><TheatreList/></DashboardLayout>
  },
  {
    path:"/movies",
    element: <DashboardLayout title={'Movies'}><MovieList/></DashboardLayout> 
  },
    {path:"/movies/:movieId",
      element:<DashboardLayout title={"Movies"}><MovieDetail/></DashboardLayout>
    },
  {
    path:"/show",
    element: <DashboardLayout title={'Show'}><ShowList/></DashboardLayout>
  },
  {
    path:"/show/:showId",
    element:<DashboardLayout title={'Show'}><ShowDetail/></DashboardLayout>
  }
])

function App() {
  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;


//Everything ok //
