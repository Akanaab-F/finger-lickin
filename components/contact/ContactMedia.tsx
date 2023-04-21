import React from "react";
import { instagramPage, whatsappContact } from "../../helpers";
import styled from 'styled-components';

const ContactMedia = () => {
  return (
    <StyledMedia className="grid mx-auto w-full my-8">
      <div className="my-8 flex justify-center items-center">
        <h1 className="capitalize font-boldFont text-3xl sm:text-4xl sm:text-center">
          Reach Us On Our Social Media Platforms
        </h1>
      </div>
      <div className="grid grid-cols-2 text-xl sm:text-3xl">
        <div className="flex flex-col gap-3 w-auto self-stretch mx-auto">
          <h3 className="inline">Talk to support</h3>
          <a href={whatsappContact} target="_blank" rel="noreferrer">
            <div className="flex items-center gap-2 text-green-800">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5229 22 22 17.5228 22 12C22 6.47715 17.5229 2 12 2C6.47718 2 2.00003 6.47715 2.00003 12C2.00003 13.5114 2.33535 14.9446 2.93565 16.229L2.22301 20.6245C2.1135 21.3 2.69954 21.8834 3.37452 21.7709L7.72984 21.045C9.02483 21.6575 10.4724 22 12 22Z"
                  stroke="#198754"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 15.1111V14.6749C16 14.1331 15.6701 13.6458 15.167 13.4446L14.7005 13.258C14.1789 13.0494 13.5845 13.2753 13.3333 13.7778C13.3333 13.7778 12.2222 13.5556 11.3333 12.6667C10.4444 11.7778 10.2222 10.6667 10.2222 10.6667C10.7247 10.4155 10.9506 9.82105 10.742 9.29949L10.5554 8.83296C10.3542 8.32988 9.86693 8 9.32509 8H8.88889C8.39797 8 8 8.39797 8 8.88889C8 12.8162 11.1838 16 15.1111 16C15.602 16 16 15.602 16 15.1111Z"
                  fill="#198754"
                />
              </svg>
              <span>Chat with us</span>
            </div>
          </a>
        </div>
        <div className="flex flex-col gap-3 w-auto self-stretch mx-auto">
          <h3>Find us</h3>
          <a rel="noreferrer" target="_blank" href={instagramPage}>
            <div className="flex items-center gap-2 text-red-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="4"
                  stroke="url(#paint0_linear_143_77)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="18"
                  cy="6"
                  r="1"
                  fill="url(#paint1_linear_143_77)"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="url(#paint2_linear_143_77)"
                  strokeWidth="1.5"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_143_77"
                    x1="12"
                    y1="2"
                    x2="12"
                    y2="22"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F96363" />
                    <stop offset="1" stopColor="#EAC957" stopOpacity="0.94" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_143_77"
                    x1="18"
                    y1="5"
                    x2="18"
                    y2="7"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F96363" />
                    <stop offset="1" stopColor="#EAC957" stopOpacity="0.94" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_143_77"
                    x1="12"
                    y1="7"
                    x2="12"
                    y2="17"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F96363" />
                    <stop offset="1" stopColor="#EAC957" stopOpacity="0.94" />
                  </linearGradient>
                </defs>
              </svg>
              <span>Follow us</span>
            </div>
          </a>
        </div>
      </div>
    </StyledMedia>
  );
};

export default ContactMedia;

const StyledMedia = styled.div`
  grid-template-rows: auto 1fr;
`