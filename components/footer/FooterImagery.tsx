const FooterImagery = () => {
  return (
    <div className="text-background400 flex flex-col justify-center md:flex-row md:justify-between">
      <div className="md:flex md:justify-between md:items-center md:mx-auto md:w-4/5 sm:w-full sm:px-10">
        <img
          className="xs:w-1/3"
          src={require("../../assets/images/logo/logo-black.png")}
          alt="footer logo imagery"
        />
        <span>bringing homechow to your doorstep</span>
      </div>
    </div>
  );
};

export default FooterImagery;
