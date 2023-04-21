import React, { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { IAlert } from "../types";
import { v4 } from "uuid";
import { removeAlert } from "../store/slices/alertsSlice";

const Alert: React.FC<Pick<IAlert, "message" | "type">> = ({
  type,
  message,
}) => {
  return (
    <div
      className={
        (type === "error"
          ? "text-red-700 bg-red-100"
          : type === "success"
          ? "text-green-700 bg-green-100"
          : type === "info"
          ? "text-sky-700 bg-sky-100"
          : "text-amber-700 bg-amber-100") +
        " m-2 bg-background100 px-5 py-3 rounded-md flex items-center"
      }
    >
      <div>
        {type === "error" ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.4" cx="12" cy="12" r="10" fill="#ef4444" />
            <path
              d="M11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17Z"
              fill="#ef4444"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 14.75C11.5858 14.75 11.25 14.4142 11.25 14L11.25 7C11.25 6.58579 11.5858 6.25 12 6.25C12.4142 6.25 12.75 6.58579 12.75 7L12.75 14C12.75 14.4142 12.4142 14.75 12 14.75Z"
              fill="#ef4444"
            />
          </svg>
        ) : type === "success" ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              opacity="0.4"
              cx="10"
              cy="10"
              r="10"
              transform="rotate(-180 10 10)"
              fill="#22c55e"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.5018 0.442536C20.8096 0.71963 20.8346 1.19385 20.5575 1.50173L11.8199 11.0991C10.8454 12.1819 9.19549 12.3168 8.05793 11.4068L4.53151 8.58566C4.20806 8.3269 4.15562 7.85493 4.41438 7.53149C4.67313 7.20804 5.1451 7.1556 5.46855 7.41436L8.99497 10.2355C9.51204 10.6492 10.262 10.5878 10.705 10.0956L19.4426 0.498283C19.7197 0.1904 20.1939 0.165442 20.5018 0.442536Z"
              fill="#22c55e"
            />
          </svg>
        ) : type === "warning" ? (
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M7.96798 1.16592C8.85365 -0.388639 11.1464 -0.388641 12.032 1.16592L19.7041 14.6324C20.5649 16.1433 19.4445 18 17.6721 18H2.32789C0.555459 18 -0.564896 16.1433 0.29587 14.6324L7.96798 1.16592Z"
              fill="#f59e0b"
            />
            <path
              d="M11 14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14C9 13.4477 9.44772 13 10 13C10.5523 13 11 13.4477 11 14Z"
              fill="#f59e0b"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 5.25C10.4142 5.25 10.75 5.58579 10.75 6V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V6C9.25 5.58579 9.58579 5.25 10 5.25Z"
              fill="#f59e0b"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.4" cx="10" cy="10" r="10" fill="#0ea5e9" />
            <path
              d="M11 5C11 5.55228 10.5523 6 10 6C9.44772 6 9 5.55228 9 5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5Z"
              fill="#0ea5e9"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H10C10.4142 7.25 10.75 7.58579 10.75 8V15C10.75 15.4142 10.4142 15.75 10 15.75C9.58579 15.75 9.25 15.4142 9.25 15V8.75H9C8.58579 8.75 8.25 8.41421 8.25 8Z"
              fill="#0ea5e9"
            />
          </svg>
        )}
      </div>
      <div className="ml-5">
        <h3>{type?.toUpperCase()}</h3>
        <span>{message}</span>
      </div>
    </div>
  );
};

const Alerts = () => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector((state: RootState) => state.alerts);

  const timer = 5000;

  useEffect(() => {
    setTimeout(() => {
      alerts.length > 0 && dispatch(removeAlert());
    }, timer);
  }, [alerts.length, dispatch]);

  return (
    <div className="fixed top-24 left-12 z-[99] h-auto w-auto">
      {alerts?.map(({ type, message }) => (
        <Alert key={v4()} type={type} message={message} />
      ))}
    </div>
  );
};

export default Alerts;
