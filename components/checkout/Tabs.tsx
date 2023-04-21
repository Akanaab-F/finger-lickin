import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import { filter } from "lodash";

import ComingSoon from "../ComingSoon";
import { checkoutUsers } from "../../helpers";
import { ICheckoutUser, UserTypes } from "../../types";

const Tab: React.FC<
  ICheckoutUser & {
    selected: ICheckoutUser;
    setSelectedUser: Dispatch<SetStateAction<ICheckoutUser>>;
    handleSetEmptyState: (type: UserTypes) => void;
  }
> = ({
  type,
  selected,
  disabled,
  soon,
  setSelectedUser,
  handleSetEmptyState,
}) => {
  const [active] = useState(type === selected.type);

  const handleSelectCheckoutUser = useCallback(() => {
    if (disabled) return;

    const filtered = filter(checkoutUsers, ["type", type])[0];
    setSelectedUser(filtered);
    handleSetEmptyState(type);
  }, [disabled, setSelectedUser, type, handleSetEmptyState]);

  return (
    <StyledTab
      onClick={handleSelectCheckoutUser}
      active={active}
      disabled={disabled}
      className="relative p-3 cursor-pointer"
    >
      {soon && (
        <div className="absolute w-full -top-3 -right-5">
          <ComingSoon />
        </div>
      )}
      <span className="capitalize font-regularFont text-2xl transition-colors duration-700">
        {type}
      </span>
    </StyledTab>
  );
};

const Tabs: React.FC<{
  users: ICheckoutUser[];
  selectedUser: ICheckoutUser;
  setSelectedUser: Dispatch<SetStateAction<ICheckoutUser>>;
  handleSetEmptyState: (type: UserTypes) => void;
}> = ({ users, selectedUser, setSelectedUser, handleSetEmptyState }) => {
  return (
    <div className="flex items-center justify-around bg-white p-3 w-2/5 lg:w-1/2 xxs:w-1/2 xxxs:w-2/3 ">
      {users.map(({ type, soon, disabled }) => (
        <Tab
          handleSetEmptyState={handleSetEmptyState}
          setSelectedUser={setSelectedUser}
          key={v4()}
          selected={selectedUser}
          type={type}
          disabled={disabled}
          soon={soon}
        />
      ))}
    </div>
  );
};

export default Tabs;

const StyledTab = styled.div<{ active: boolean; disabled: boolean }>`
  pointer: ${(props) => (props.disabled ? "default" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  span {
    postion: relative
    text-transform: capitalize;
    opacity: ${(props) => (props.disabled ? 0.3 : 1)};
    color: ${(props) => (props.active ? "#F6523B" : "#686767")};
  }

  span::after {
    content: "";
    width: 75%;
    position: absolute;
    height: 2px;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    background-color: ${(props) => (props.active ? "#F6523B" : "transparent")};
    
    @media (max-width: 40em) {
      bottom: 4px;
    }   
    
    @media (max-width: 20em) {
      bottom: 6px;
    }
  }
`;
