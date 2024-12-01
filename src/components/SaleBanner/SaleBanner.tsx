const SaleBanner = () => {
  return (
    <div className=" p-10">
      <p className="text-2xl p-2">
        Black{" "}
        <b>
          Friday S<u className="decoration-red-500 ">ale</u>
        </b>
      </p>
      <img
        className="rounded-xl shadow-md"
        src="https://www.boat-lifestyle.com/cdn/shop/files/Strip-Desktop_c6e79b93-8f25-4b2d-9246-865d1f1a6ee6_1600x.jpg?v=1732699786"
        alt=""
      />
    </div>
  );
};
export default SaleBanner;
