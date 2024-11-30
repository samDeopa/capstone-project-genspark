import React from "react";
import "./styles.css"; // Assuming you have styles defined in a separate CSS file

interface PressItemProps {
  index: number;
  content: string;
  logoSrc: string;
  altText: string;
}

const PressItem: React.FC<PressItemProps> = ({
  index,
  content,
  logoSrc,
  altText,
}) => (
  <div className="item" data-index={index} style={{ width: 1307 }}>
    <div className="press-content">
      <div className="quote-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="58"
          height="57"
          viewBox="0 0 58 57"
        >
          <g id="quote" transform="translate(0.352 -0.468)">
            <rect
              id="Frame"
              width="58"
              height="57"
              transform="translate(-0.352 0.468)"
              fill="#1a2024"
              opacity="0"
            />
            <path
              id="Path_17515"
              data-name="Path 17515"
              d="M375.616,596.744l-6.091,12.178a2.37,2.37,0,0,1-2.122,1.313h-6.108a1.187,1.187,0,0,1-1.061-1.719l6.262-12.525h-5.935A3.562,3.562,0,0,1,357,592.43v-11.87A3.562,3.562,0,0,1,360.561,577H372.43a3.562,3.562,0,0,1,3.561,3.561v14.59A3.571,3.571,0,0,1,375.616,596.744Z"
              transform="translate(-325.823 -564.814)"
              fill="#1a2024"
              opacity="0.4"
            />
            <path
              id="Path_17516"
              data-name="Path 17516"
              d="M365.616,596.744l-6.091,12.178a2.37,2.37,0,0,1-2.122,1.313h-6.108a1.187,1.187,0,0,1-1.061-1.719l6.262-12.525h-5.935A3.562,3.562,0,0,1,347,592.43v-11.87A3.562,3.562,0,0,1,350.561,577h11.87a3.562,3.562,0,0,1,3.561,3.561v14.59A3.571,3.571,0,0,1,365.616,596.744Z"
              transform="translate(-339.562 -564.814)"
              fill="#1a2024"
            />
          </g>
        </svg>
      </div>
      <p>{content}</p>
      <span className="visually-hidden">Go to slide {index + 1}</span>
    </div>
    <div className="press-logos">
      <img
        className="press-list__logo-image"
        loading="lazy"
        style={{ maxWidth: 231 }}
        sizes="231px"
        height={77}
        width={231}
        alt={altText}
        src={logoSrc}
      />
    </div>
  </div>
);

const PressSlider: React.FC = () => {
  const pressItems: PressItemProps[] = [
    {
      index: 0,
      content:
        "boAt is the first company from the consumer lifestyle electronics industry to collaborate with the ICEA to bring out the Indigenous 1",

      logoSrc:
        "//www.boat-lifestyle.com/cdn/shop/files/Business_World_231x.png?v=1705038093",
      altText: "Business World Logo",
    },
    {
      index: 1,
      content:
        "Boat, India’s leading wearables brand has named Indian cricketer Jemimah Rodrigues as the newest brand ambassador.",
      logoSrc:
        "//www.boat-lifestyle.com/cdn/shop/files/Fashion_Network_231x.png?v=1705038134",
      altText: "Fashion Network Logo",
    },
    // ... other press items
  ];

  return (
    <div className="container MultiCarousel_container">
      <div className="row">
        <div
          className="press-list MultiCarousel template--14683849556066__16476194914dad6aa9 MultiCarousel_load"
          id="MultiCarousel_press1"
          data-sliderid="template--14683849556066__16476194914dad6aa9"
          data-interval="1000"
          data-autoplay-timeout="5000"
          data-items="1"
          data-loop="true"
          data-responsiveclass="true"
          data-autoplay="false"
          data-centerslidescale="false"
          data-slide="1"
          data-showactivedots="false"
          data-nav="false"
          data-dots="false"
          data-responsive_small_items="1"
          data-responsive_small_dots="false"
          data-responsive_desk_items="1"
          data-responsive_mid_items="1"
          data-enable_progressbar=""
          data-last_item_padding="0"
        >
          <div
            className="custom_press_slider MultiCarousel-inner template--14683849556066__16476194914dad6aa9 draggable MultiCarousel_loaded"
            draggable="true"
            style={{ transform: "translateX(-2614px); width: 6535px" }}
          >
            {pressItems.map((item) => (
              <PressItem key={item.index} {...item} />
            ))}
          </div>
          <button className="btn btn-primary leftLst template--14683849556066__16476194914dad6aa9">
            &lt;
          </button>
          <button className="btn btn-primary rightLst template--14683849556066__16476194914dad6aa9">
            &gt;
          </button>
          <ul className="MultiCarousel_dots_container">
            {pressItems.map((_, index) => (
              <li
                key={index}
                className={`multiCarousel_dots ${index === 2 ? "active" : ""}`}
                data-index={index}
              >
                {`${index + 1}/${pressItems.length}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PressSlider;
