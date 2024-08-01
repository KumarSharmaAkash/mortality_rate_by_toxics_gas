import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Breadcrumb from './components/Breadcrumbs/Breadcrumb';

interface DataPoint {
  time: number;
  rate: number;
}

interface MortalityGraphProps {
  data: DataPoint[];
}

const MortalityGraph: React.FC<MortalityGraphProps> = ({ data }) => {
  console.log({data})
  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'numeric',
      categories: data.map((d) => d.time.toFixed(2)), 
      title: {
        text: 'Time Interval ',
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      min: 0,
      max: 100,
      tickAmount: 25,


    },
    yaxis: {
      title: {
        text: 'Mortality Rate',
        style: {
          fontSize: '12px',
        },
      },
      min: 0,
      max: 1,
    },
  };

  const series = [
    {
      name: 'Mortality Rate',
      data: data.map((d) => parseFloat(d.rate.toFixed(2))), 
    },
  ];

  return (
   <>
    <Breadcrumb pageName="Mortality Rate With Respect To Time" />
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Mortality Rate</p>
              <p className="text-sm font-medium">Time Interval vs Mortality Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
      </div>
    </div></>
  );
};

export default MortalityGraph;
