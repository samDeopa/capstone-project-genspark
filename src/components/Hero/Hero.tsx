import React, { useRef, useState } from "react";
import { ReactComponent as Arrow } from "./arrow_homepage.svg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./hero.css";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function HeroSection() {
  const sliderImageArray = [
    "https://www.boat-lifestyle.com/cdn/shop/files/Artboard-2_1440x.png?v=1732274157",
    "https://www.boat-lifestyle.com/cdn/shop/files/Artboard_2_81ec95a0-7f06-4358-bb94-69a6a2966c8b_1440x.png?v=1732514785",
    "https://www.boat-lifestyle.com/cdn/shop/files/Artboard_2_bc7493ee-103a-4dd5-ab6c-ac8a8694aa91_1440x.jpg?v=1730958910",
    "https://www.boat-lifestyle.com/cdn/shop/files/Artboard_2_c51d0ad3-c3a0-4981-b7bd-17a136809fe4_1440x.jpg?v=1726849779",
    "https://www.boat-lifestyle.com/cdn/shop/files/FK-2_1440x.jpg?v=1726059667",
    "https://www.boat-lifestyle.com/cdn/shop/files/ION_Banner_WEB_f2f301b9-04e1-41f9-b424-a024680e6acc_1600x.jpg?v=1727264228",
    "https://www.boat-lifestyle.com/cdn/shop/files/Maati_1440x602_Fariye_34a135e8-526b-41de-ae56-238db5f256e4_1440x.png?v=1732697890",
  ];
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderImageArray.map((imageUrl) => (
          <SwiperSlide>
            <img src={imageUrl} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className=" bg-[#F6FAFE] flex justify-around">
        <div className="flex items-center ">
          <img
            className="h-[58px] w-[58px]"
            src="https://www.boat-lifestyle.com/cdn/shop/files/Group_334305_small.svg?v=1682336123"
            alt=""
          />
          <div>
            <p className="text-sm">1 year </p>
            <p className="text-xs">Warranty</p>
          </div>
        </div>
        <div className="flex items-center ">
          {" "}
          <img
            className="h-[58px] w-[58px]"
            src="https://www.boat-lifestyle.com/cdn/shop/files/Group_334304_small.svg?v=1682336123"
            alt=""
          />
          <div>
            <p className="text-sm">7-Day </p>
            <p className="text-xs">Replacement</p>
          </div>
        </div>
        <div className="flex items-center ">
          {" "}
          <img
            className="h-[58px] w-[58px]"
            src="https://www.boat-lifestyle.com/cdn/shop/files/Group_334303_small.svg?v=1682336123"
            alt=""
          />
          <div>
            <p className="text-sm">Free Express </p>
            <p className="text-xs">Deilivery</p>
          </div>
        </div>
        <div className="flex items-center ">
          {" "}
          <img
            className="h-[58px] w-[58px]"
            src="https://www.boat-lifestyle.com/cdn/shop/files/Group_334302_small.svg?v=1682336123"
            alt=""
          />
          <div>
            <p className="text-sm">GST </p>
            <p className="text-xs">Billing</p>
          </div>
        </div>
      </div>
    </>
  );
}
