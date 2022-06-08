import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Dogs from './components/Dogs';
import Cats from './components/Cats';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
    const [dogs, setDogs] = useState([]);
    const [url, setUrl] = useState('/dogs/?limit=3&offset=0');
    const [cats, setCats] = useState([]);
    const [urlC, setUrlC] = useState('/cats/?limit=3&offset=0');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const getDogs = async (url, options =null) => {
        setUrl(url);
        try {
            const response = await axiosPrivate.get(url, options);
            console.log(response.data);
            setDogs(response.data);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    const getCats = async (url, options =null) => {
      setUrlC(urlC);
      try {
          const response = await axiosPrivate.get(url, options);
          console.log(response.data);
          setCats(response.data);
      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
    }

    useEffect(() => {
        const controller = new AbortController();
        getDogs(url, {
            signal: controller.signal
        });
        return () => {
            controller.abort();
        }
    }, []);

    useEffect(() => {
      const controller = new AbortController();
      getCats(urlC, {
          signal: controller.signal
      });
      return () => {
          controller.abort();
      }
    }, []);

  const dogAddHandler = async ({name}) => {
    console.log('DOG: ',name);
    const response = await axiosPrivate.post('/dogs/', JSON.stringify({id: 0,name}));
    console.log(response.data);
    getDogs(url);
  }  
  
  const dogUpdateHandler = async (dog) => {
    console.log('DOG: ',dog);
    const response = await axiosPrivate.put('/dogs/', JSON.stringify(dog));
    console.log(response.data);
    getDogs(url);
  }  

  const dogDeleteHandler = async (dog) => {
    console.log('DOG: ',dog);
    const response = await axiosPrivate.delete('/dogs/', JSON.stringify(dog));
    console.log(response.data);
    getDogs(url);
  }

  const catAddHandler = async ({name}) => {
    console.log('CAT: ',name);
    const response = await axiosPrivate.post('/cats/', JSON.stringify({id: 0,name}));
    console.log(response.data);
    getCats(url);
  }  
  
  const catUpdateHandler = async (cat) => {
    console.log('CAT: ',cat);
    const response = await axiosPrivate.put('/cats/', JSON.stringify(cat));
    console.log(response.data);
    getCats(url);
  }  

  const catDeleteHandler = async (cat) => {
    console.log('CAT: ',cat);
    const response = await axiosPrivate.delete('/cats/', JSON.stringify(cat));
    console.log(response.data);
    getCats(url);
  } 

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="dogs" element={<Dogs dogs={dogs} getDogs={getDogs} />} />
          <Route path="dogs/create" element={<DogAdd addHandler={dogAddHandler} />} />
          <Route path="dogs/view/:id" element={<DogDetail  />} />
          <Route path="dogs/edit/:id" element={<DogEdit updateHandler={dogUpdateHandler} />} />
          <Route path="dogs/delete/:id" element={<DogDelete deleteHandler={dogDeleteHandler} />} />
          <Route path="cats" element={<Cats dogs={cats} getCats={getCats} />} />
          <Route path="cats/create" element={<CatAdd addHandler={catAddHandler} />} />
          <Route path="cats/view/:id" element={<CatDetail  />} />
          <Route path="cats/edit/:id" element={<CatEdit updateHandler={catUpdateHandler} />} />
          <Route path="cats/delete/:id" element={<CatDelete deleteHandler={catDeleteHandler} />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;