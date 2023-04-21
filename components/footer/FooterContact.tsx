import {
  emailAddress,
  facebookPage,
  instagramPage,
  whatsappContact,
} from "../../helpers";

const FooterContact = () => {
  return (
    <div className="mx-auto w-1/5 tablet:w-1/4 sm:w-1/3">
      <div className="w-full">
        <ul className="h-full w-full flex justify-evenly">
          <li className="flex items-center cursor-pointer">
            <a
              className="flex items-center cursor-pointer"
              target="_blank"
              rel="noreferrer"
              href={instagramPage}
            >
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="20"
                  height="20"
                  rx="4"
                  stroke="#FAEDEE"
                  strokeWidth="1.5"
                />
                <circle cx="17" cy="5" r="1" fill="#FAEDEE" />
                <circle
                  cx="11"
                  cy="11"
                  r="5"
                  stroke="#FAEDEE"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </li>
          <li className="flex items-center cursor-pointer">
            <a
              className="flex items-center cursor-pointer"
              rel="noreferrer"
              target="_blank"
              href={whatsappContact}
            >
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 21C16.5229 21 21 16.5228 21 11C21 5.47715 16.5229 1 11 1C5.47718 1 1.00003 5.47715 1.00003 11C1.00003 12.5114 1.33535 13.9446 1.93565 15.229L1.22301 19.6245C1.1135 20.3 1.69954 20.8834 2.37452 20.7709L6.72984 20.045C8.02483 20.6575 9.47242 21 11 21Z"
                  stroke="#FAEDEE"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 14.1111V13.6749C15 13.1331 14.6701 12.6458 14.167 12.4446L13.7005 12.258C13.1789 12.0494 12.5845 12.2753 12.3333 12.7778C12.3333 12.7778 11.2222 12.5556 10.3333 11.6667C9.44444 10.7778 9.22222 9.66667 9.22222 9.66667C9.72465 9.41545 9.95064 8.82105 9.74202 8.29949L9.55541 7.83296C9.35418 7.32988 8.86693 7 8.32509 7H7.88889C7.39797 7 7 7.39797 7 7.88889C7 11.8162 10.1838 15 14.1111 15C14.602 15 15 14.602 15 14.1111Z"
                  fill="#FAEDEE"
                />
              </svg>
            </a>
          </li>
          <li className="flex items-center cursor-pointer">
            <a
              className="flex items-center cursor-pointer"
              rel="noreferrer"
              target="_blank"
              href={facebookPage}
            >
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 1H5C2.79086 1 1 2.79086 1 5V17C1 19.2091 2.79086 21 5 21H9.5V14H6V11H9.5V9C9.5 6.79086 11.2909 5 13.5 5H16V8H13.5C12.9477 8 12.5 8.44772 12.5 9V11H16V14H12.5V21H17C19.2091 21 21 19.2091 21 17V5C21 2.79086 19.2091 1 17 1Z"
                  stroke="#FAEDEE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
          <li className="flex items-center cursor-pointer">
            <a
              className="flex items-center cursor-pointer"
              rel="noreferrer"
              target="_blank"
              href={`mailto:${emailAddress}`}
            >
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="20"
                  height="18"
                  rx="4"
                  stroke="#FAEDEE"
                  strokeWidth="1.5"
                />
                <path
                  d="M1 5L8.50122 11.001C9.96209 12.1697 12.0379 12.1697 13.4988 11.001L21 5"
                  stroke="#FAEDEE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterContact;
