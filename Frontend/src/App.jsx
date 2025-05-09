
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  // const [loading, setLoading] = useState(true); // State to manage the loading indicator
  // const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // useEffect(() => {
  //   // Fetch the current user data when the app loads
  //   authService.getCurrentUser() 
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login({ userData })); // Dispatch login action if user data is available
  //       } else {
  //         dispatch(logout()); // Dispatch logout action if no user data is found
  //       }
  //     })
  //     .finally(() => setLoading(false)); // Set loading to false after the authentication check
  // }, [dispatch]); // Dependency array ensures this runs only once on mount



  return  ( // Render the app only after the loading state is false
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        {/* Render the header */}
        <Header />
        <main>
          {/* Render the dynamic content based on the current route */}
          <Outlet />
        </main>
        {/* Render the footer */}
        <Footer />
      </div>
    </div>
  ) // Render nothing while loading
}

export default App;