const BestSellers = () => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
    }
  };

  return (
    <div className="px-10">
      <p className="text-2xl mb-2 ">
        Best{" "}
        <b>
          S<u className="decoration-red-500 ">ellers</u>
        </b>
      </p>
      <div className="flex gap-4 h-[380px] ">
        <div
          className="h-[320px] w-[320px] border-4 border-gray-300 shadow-lg rounded-md overflow-hidden transform transition duration-300 hover:scale-105 hover:border-blue-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            src="https://www.boat-lifestyle.com/cdn/shop/files/quinn_RUxbhR7CvjkNtlFUDxgw9.mp4"
            className="w-full h-full object-cover"
            muted
          />
          <p className="text-center mt-2 text-xl">Smartwatches</p>
        </div>
        <div
          className="h-[320px] w-[320px] border-4 border-gray-300 shadow-lg rounded-md overflow-hidden transform transition duration-300 hover:scale-105 hover:border-blue-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            src="https://www.boat-lifestyle.com/cdn/shop/files/quinn_Bejc8URjU1NSXdhabLCmD.mp4"
            className="w-full h-full object-cover"
            muted
          />
          <p className="text-center mt-2 text-xl">Smartwatches</p>
        </div>
        <div
          className="h-[320px] w-[320px] border-4 border-gray-300 shadow-lg rounded-md overflow-hidden transform transition duration-300 hover:scale-105 hover:border-blue-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            src="https://www.boat-lifestyle.com/cdn/shop/files/quinn_OyJHanx4QSdUN3OVGTO7C.mp4"
            className="w-full h-full object-cover"
            muted
          />
          <p className="text-center mt-2 text-xl">Smartwatches</p>
        </div>
        <div
          className="h-[320px] w-[320px] border-4 border-gray-300 shadow-lg rounded-md overflow-hidden transform transition duration-300 hover:scale-105 hover:border-blue-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            src="https://www.boat-lifestyle.com/cdn/shop/files/quinn_CpsRIdJWtpXyFN3enwbXd.mp4"
            className="w-full h-full object-cover"
            muted
          />
          <p className="text-center mt-2 text-xl">Smartwatches</p>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
