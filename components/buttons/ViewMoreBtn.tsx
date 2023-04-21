import styled from "styled-components";

const ViewMoreBtn = () => {
  return (
    <StyledBtn className="bg-background400 text-base tablet:text-xl xxs:text-2xl text-primary400 rounded-lg p-3 transition-all duration-500 flex justify-center items-center hover:bg-primary400 hover:text-background300 cursor-pointer">
      View more
      <div className="ml-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 9.00002L21 3.00003M21 3.00003L15 3.00003M21 3.00003L10 14"
            stroke="#F6523B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 5H7C4.79086 5 3 6.79086 3 9V17C3 19.2091 4.79086 21 7 21H15C17.2091 21 19 19.2091 19 17V12"
            stroke="#F6523B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </StyledBtn>
  );
};

const StyledBtn = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: fit-content;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    svg {
      transition: all 500ms ease-in;

      path {
        transition: all 500ms ease-in;
        stroke: #fff;
      }
    }
  }
`;

export default ViewMoreBtn;
