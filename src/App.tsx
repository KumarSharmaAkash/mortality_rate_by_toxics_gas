import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Profile from './pages/Profile';
import DefaultLayout from './layout/DefaultLayout';

import MortalityGraph from './MortalityGraph';
import MortalityForm from './MortalityForm';
import MortalityGraphChart from './MortalityGraphChart';
import MortalityGraphwithArea from './MortalityGraphwithArea';
import MapInput from './components/MapInput';
import GoogleMapComponent from './components/GoogleMapComponent';

interface DataPointArea {
  area: number;
  rate: number;
}

interface HighlightedArea {
  center: google.maps.LatLngLiteral;
  radius?: number;
  path?: google.maps.LatLngLiteral[];
  color: string;
}

function App() {
  const [data, setData] = useState<{ time: number; rate: number }[]>([]);
  const [dataConc, setDataConc] = useState<{ conc: number; Concentration: number }[]>([]);
  const [DataForArea, setDataForArea] = useState<{ area: number; rate: number }[]>([]);
  const [longitude, setLongitude] = useState<number>(0);
  const [altitude, setAltitude] = useState<number>(0);
  const [graphData, setGraphData] = useState<DataPointArea[]>([]);
  const [highlightedAreas, setHighlightedAreas] = useState<HighlightedArea[]>([]);
  const [shape, setShape] = useState<string>('circle');
  const [radius, setRadius] = useState<number>(1000); // Default radius
  const [sideLength, setSideLength] = useState<number>(0.05); // Default side length

  const handleFormSubmit = (lng: number, alt: number) => {
    setLongitude(lng);
    setAltitude(alt);
    setGraphData([...graphData, { area: lng, rate: alt }]);

    const colors = ['#FF0000', '#FFA500', '#FFFF00']; // Red, Orange, Yellow
    const color = colors[highlightedAreas.length % colors.length]; // Cycle through colors

    if (shape === 'circle') {
      setHighlightedAreas([
        ...highlightedAreas,
        {
          center: { lat: alt, lng: lng },
          radius: radius, // Use user-provided radius
          color: color,
        },
      ]);
    } else if (shape === 'polygon') {
      const halfSide = sideLength / 2;
      setHighlightedAreas([
        ...highlightedAreas,
        {
          center: { lat: alt, lng: lng },
          path: [
            { lat: alt - halfSide, lng: lng - halfSide },
            { lat: alt - halfSide, lng: lng + halfSide },
            { lat: alt + halfSide, lng: lng + halfSide },
            { lat: alt + halfSide, lng: lng - halfSide },
          ],
          color: color,
        },
      ]);
    }
  };

  const handleShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShape(event.target.value);
  };

  const [areaType, setAreaType] = useState<string>('square');
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
              <MortalityForm setData={setData} setDataConc={setDataConc} setDataForArea={setDataForArea}/> 
              {data.length > 0 && <MortalityGraph data={data} />}
              {dataConc.length > 0 && <MortalityGraphChart dataConc={dataConc} />}
              {DataForArea.length > 0 && <MortalityGraphwithArea DataForArea={DataForArea} areaType={areaType} />}
              <div>
              <label className="mb-2.5 block text-black dark:text-white" htmlFor="shape">Select Shape: </label>
                <select id="shape" value={shape} onChange={handleShapeChange}>
                  <option value="circle">Circle</option>
                  <option value="polygon">Polygon</option>
                </select>
                {shape === 'circle' && (
                  <div>
                  <label className="mb-2.5 block text-black dark:text-white" htmlFor="radius">Radius (meters): </label>
                    <input
                      type="number"
                      id="radius"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={radius}
                      onChange={(e) => setRadius(Number(e.target.value))}
                    />
                  </div>
                )}
                {shape === 'polygon' && (
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white" htmlFor="sideLength">Side Length (degrees): </label>
                    <input
                      type="number"
                      id="sideLength"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={sideLength}
                      onChange={(e) => setSideLength(Number(e.target.value))}
                    />
                  </div>
                )}
              </div>
              <MapInput onSubmit={handleFormSubmit}/>
              <GoogleMapComponent
                longitude={longitude}
                altitude={altitude}
                highlightedAreas={highlightedAreas} />
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
