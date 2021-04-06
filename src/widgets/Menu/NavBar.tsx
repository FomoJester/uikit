import { render } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MenuEntry } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { NavBarProps, PanelProps } from "./types";

const NavBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const NavBar: React.FC<NavBarProps> = ({ linksFullScreen }) => {
  return (
    <NavBody>
      {linksFullScreen.map((link) => {
        return (
          <MenuEntry key={link.href} secondary isActive={false}>
            <MenuLink href={link.href}>{link.label}</MenuLink>
          </MenuEntry>
        );
      })}
    </NavBody>
  );
};

export default NavBar;
