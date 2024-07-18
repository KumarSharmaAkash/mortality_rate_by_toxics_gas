import React, { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from './components/Breadcrumbs/Breadcrumb';

interface MortalityFormProps {
  setData: (data: DataPoint[]) => void;
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
}

interface DataPoint {
  time: number;
  rate: number;
}

const MortalityForm: React.FC<MortalityFormProps> = ({ setData }) => {
  const [form, setForm] = useState<FormState>({
    gasName: '',
    LD50_valueofgas: 0,
    person_mass: 0,
    std_densityofgas: 0,
    std_densityofair: 0,
    gasMolarMass: 0,
    breathing_rate: 0,
    exposure_time: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: parseFloat(value) || value
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
      exposure_time
    } = form;

const calculatedData: DataPoint[] = [];
for (let i = 1; i <= 1000; i=i+150) {
 const time = i * exposure_time / 10;
    const rate = 2 ** -((LD50_valueofgas * person_mass) / (std_densityofgas * breathing_rate * gasMolarMass * time));
    calculatedData.push({ time, rate });
}

setData(calculatedData);

  }

  return (
    <>
      <Breadcrumb pageName="form" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Mortality Rate Form</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Gas Name:
              </label>
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
              <label className="mb-2.5 block text-black dark:text-white">
                LD50 Value of Gas:
              </label>
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
              <label className="mb-2.5 block text-black dark:text-white">
                Person Mass (kg):
              </label>
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
              <label className="mb-2.5 block text-black dark:text-white">
                Standard Density of Gas:
              </label>
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
              <label className="mb-2.5 block text-black dark:text-white">
                Standard Density of Air:
              </label>
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
              <label className="mb-2.5 block text-black dark:text-white">
                Gas Molar Mass:
              </label>
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
              <label className="mb-2.5 block text-black dark:text-white">
                Breathing Rate (L/min):
              </label>
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
              <label className="mb-2.5 block text-black dark:text-white">
                Exposure Time (min):
              </label>
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
          <button type="submit" className="w-full sm:w-auto mb-4 rounded border-[1.5px] border-stroke bg-transparent py-3 px-6 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white bg-sky-500 hover:bg-sky-600">
            Calculate
          </button>
        </form>
      </div>
    </>
  );
};

export default MortalityForm;
