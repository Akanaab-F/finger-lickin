import styled from "styled-components";

const CampusList = () => {
  return (
    <StyledCampusList
      id="campuslist"
      className="w-full h-[15rem] flex justify-evenly items-center xl:w-[85%] xl:justify-between xl:mx-auto md:w-[75%] md:flex-col md:my-5 xs:w-[95%]"
    >
      <h2 className="font-boldFont text-5xl lg:basis-1/2 text-center md:flex md:items-center md:justify-center">
        Universities we serve!
      </h2>
      <div className="flex justify-center items-center md:justify-between md:w-full">
        <img
          className="lg:h-36"
          src={require("../assets/images/ug.png")}
          alt="ug logo"
        />
        <img
          className="lg:h-24"
          src={require("../assets/images/upsa.png")}
          alt="upsa logo"
        />
      </div>
    </StyledCampusList>
  );
};

export default CampusList;

const StyledCampusList = styled.section`
  @media screen and (min-width: 120em) {
    width: 1560px !important;
    margin: 0 auto;
  }
`;
