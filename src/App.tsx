import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Profile from './pages/Profile';
import DefaultLayout from './layout/DefaultLayout';

import MortalityGraph from './MortalityGraph';
import MortalityForm from './MortalityForm';

interface DataPoint {
  time: number;
  rate: number;
}

function App() {
  const [data, setData] = useState<{ time: number; rate: number }[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Home | DRDO(INMAS)" />
              <MortalityForm setData={setData}/> 
              {data && <MortalityGraph data={data} />}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="About | DRDO(INMAS)" />
              <Profile />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
