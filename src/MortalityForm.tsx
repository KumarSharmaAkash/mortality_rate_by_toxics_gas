import React, { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from './components/Breadcrumbs/Breadcrumb';

interface MortalityFormProps {
  setData: (data: DataPoint[]) => void;
  setDataConc: (dataConc: DataPointConc[]) => void;
  setDataForArea: (DataForArea: DataPointArea[]) => void;
}

interface FormState {
  gasName: string;
  LD50_valueofgas: number;
  person_mass: number;
  std_densityofgas: number;
  std_densityofair: number;
  gasMolarMass: number;
  breathing_rate: number;
  exposure_time: number;
  molesGas: number;
  molesAir: number;
  areaType: string;
  squareSide: number;
  length: number;
  breadth: number;
  radius: number;
}

interface DataPoint {
  time: number;
  rate: number;
}

interface DataPointConc {
  conc: number;
  Concentration: number;
}

interface DataPointArea {
  area: number;
  rate: number;
}

const MortalityForm: React.FC<MortalityFormProps> = ({ setData, setDataConc, setDataForArea }) => {
  const [form, setForm] = useState<FormState>({
    gasName: '',
    LD50_valueofgas: 0,
    person_mass: 0,
    std_densityofgas: 0,
    std_densityofair: 0,
    gasMolarMass: 0,
    breathing_rate: 0,
    exposure_time: 0,
    molesGas: 0,
    molesAir: 0,
    areaType: 'square',
    squareSide: 0,
    length: 0,
    breadth: 0,
    radius: 0,
  });

  const [mixtureDensity, setMixtureDensity] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: parseFloat(value) || value,
    });
  };

  const handleAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      areaType: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const {
      LD50_valueofgas,
      person_mass,
      std_densityofgas,
      std_densityofair,
      gasMolarMass,
      breathing_rate,
      exposure_time,
      molesGas,
      molesAir,
      areaType,
      squareSide,
      length,
      breadth,
      radius,
    } = form;
    let area: number = 0;
    switch (areaType) {
      case 'square':
        area = squareSide ** 2;
        break;
      case 'rectangle':
        area = length * breadth;
        break;
      case 'circle':
        area = Math.PI * radius ** 2;
        break;
      default:
        area = 1;
    }

    const calculatedMixtureDensity = (std_densityofgas * molesGas) + (std_densityofair * molesAir);
    const gasMolarMassFraction = (gasMolarMass * molesGas) / ((gasMolarMass * molesGas) + (28.96 * molesAir));
    setMixtureDensity(calculatedMixtureDensity);
//rate with time 
    const calculatedData: DataPoint[] = [];
    for (let i = 1; i <= 1000; i += 50) {
      const time = i * exposure_time / 10;
      const rate = 2 ** -((LD50_valueofgas * person_mass) / (calculatedMixtureDensity * breathing_rate * gasMolarMassFraction * time));
      calculatedData.push({ time, rate });
    }



    
//rate with concentration
    const calculatedDataConc: DataPointConc[] = [];
    for (let i = molesGas; i <= molesGas +10; i += 0.1) {
      const calculatedMixtureDensityC = (std_densityofgas * i) + (std_densityofair * molesAir);
      const conc = i;
      const Concentration = 2 ** -((LD50_valueofgas * person_mass) / (calculatedMixtureDensityC * breathing_rate * gasMolarMassFraction * exposure_time));
      calculatedDataConc.push({ conc, Concentration });
    }

    setData(calculatedData);
    setDataConc(calculatedDataConc);



//rate with area
const calculatedDataArea: DataPointArea[] = [];
const rateA = 2 ** -((LD50_valueofgas * person_mass) / (calculatedMixtureDensity * breathing_rate * gasMolarMassFraction * exposure_time));
for (let currentArea = area; currentArea <= area * 10; currentArea += area) {
  const rate = rateA/ currentArea;
  calculatedDataArea.push({ area: currentArea, rate });
const calculatedData: DataPoint[] = [];
for (let i = 1; i <= 1000; i=i+50) {
 const time = i * exposure_time / 10;
    const rate = 2 ** -((LD50_valueofgas * person_mass) / (std_densityofgas * breathing_rate * gasMolarMass * time));
    calculatedData.push({ time, rate });
}

console.log(calculatedDataArea);

setDataForArea(calculatedDataArea);

  };
  
}

  return (
    <>
      <Breadcrumb pageName="Simulation Of Live Monitoring Of Toxic Nature Of Gases With Respect To Effectiveness On Living Beings." />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Mortality Rate Form</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Toxic Gas Name:</label>
              <input
                type="text"
                name="gasName"
                value={form.gasName}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">LD50 Value of Toxic Gas (g/cm³):</label>
              <input
                type="number"
                name="LD50_valueofgas"
                value={form.LD50_valueofgas}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Number of Moles of Toxic Gas:</label>
              <input
                type="number"
                name="molesGas"
                value={form.molesGas}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Number of Moles of Air:</label>
              <input
                type="number"
                name="molesAir"
                value={form.molesAir}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Standard Density of Toxic Gas (g/cm³):</label>
              <input
                type="number"
                name="std_densityofgas"
                value={form.std_densityofgas}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Standard Density of Air (g/cm³):</label>
              <input
                type="number"
                name="std_densityofair"
                value={form.std_densityofair}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Gas Molar Mass (g/mol):</label>
              <input
                type="number"
                name="gasMolarMass"
                value={form.gasMolarMass}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Person Mass (kg):</label>
              <input
                type="number"
                name="person_mass"
                value={form.person_mass}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Breathing Rate (L/min):</label>
              <input
                type="number"
                name="breathing_rate"
                value={form.breathing_rate}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Exposure Time (hours):</label>
              <input
                type="number"
                name="exposure_time"
                value={form.exposure_time}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Area Type:</label>
            <select
              name="areaType"
              value={form.areaType}
              onChange={handleAreaChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="square">Square</option>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
            </select>
          </div>
          {form.areaType === 'square' && (
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Side Length (m):</label>
              <input
                type="number"
                name="squareSide"
                value={form.squareSide}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          )}
          {form.areaType === 'rectangle' && (
            <>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Length (m):</label>
                <input
                  type="number"
                  name="length"
                  value={form.length}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Breadth (m):</label>
                <input
                  type="number"
                  name="breadth"
                  value={form.breadth}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </>
          )}
          {form.areaType === 'circle' && (
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Radius (m):</label>
              <input
                type="number"
                name="radius"
                value={form.radius}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          )}
          <button
            type="submit"
            className="mt-6 w-full rounded bg-primary py-3 px-5 text-white font-medium transition hover:bg-primary-dark focus:outline-none active:bg-primary-dark disabled:bg-gray-300"
          >
            Calculate Mortality Rates
          </button>
          {mixtureDensity && (
            <div className="mt-6 p-4 border rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              <h4 className="font-medium">Calculated Mixture Density: {mixtureDensity.toFixed(2)} g/cm³</h4>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default MortalityForm;
