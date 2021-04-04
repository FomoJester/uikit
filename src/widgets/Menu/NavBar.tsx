import { render } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MenuEntry } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps } from "./types";

const NavBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const NavBar: React.FC<PanelProps> = ({ links }) => {
  return (
    <NavBody>
      <MenuEntry key={"/farms"} secondary isActive={false}>
        <MenuLink href={"/farms"}>FARMS</MenuLink>
      </MenuEntry>
      <MenuEntry key={"/dough"} secondary isActive={false}>
        <MenuLink href={"/dough"}>STAKING</MenuLink>
      </MenuEntry>
      <MenuEntry key={"/exchange"} secondary isActive={false}>
        <MenuLink href={"/exchange"}>BUY DUMP</MenuLink>
      </MenuEntry>
    </NavBody>
  );
};

export default NavBar;
