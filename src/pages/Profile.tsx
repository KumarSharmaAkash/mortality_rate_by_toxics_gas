import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';

const Profile = () => {
  return (
    <>
      <Breadcrumb pageName="Project" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userSix} alt="profile" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              INMAS(DRDO)
            </h3>
            <p className="font-medium">CBRN</p>
            

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
              Simulating the mortality rate of toxic gases over a specified time period in collaboration with INMAS(DRDO) scientists. 
              </h4>
              <p className="mt-4.5">
              The development of this React.js-based website for calculating mortality rates due to toxic gas inhalation represents a significant step forward in addressing public health and safety concerns. By leveraging modern web technologies, we can enhance our understanding and response to the dangers posed by toxic gases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
