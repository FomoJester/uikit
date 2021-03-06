import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import Overlay from "../../components/Overlay/Overlay";
import { Flex } from "../../components/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./Logo";
import Panel from "./Panel";
import UserBlock from "./UserBlock";
import { NavProps } from "./types";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import Avatar from "./Avatar";
import { MenuEntry } from "./MenuEntry";
import MenuLink from "./MenuLink";
import NavBar from "./NavBar";
import Link from "../../components/Link/Link";
import * as IconModule from "./icons";
import { PancakeRoundIcon, CogIcon, SvgProps } from "../../components/Svg";

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { TwitterIcon, TelegramIcon, GithubIcon, MediumIcon, GitbookIcon } = Icons;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
  background-color: #fc5296;
  background-image: linear-gradient(315deg, #fc5296 0%, #f67062 74%);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean; isMobile: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed, isMobile }) =>
      `${isPushed && isMobile ? SIDEBAR_WIDTH_FULL : isMobile ? SIDEBAR_WIDTH_REDUCED : 0}px`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  priceLink,
  profile,
  children,
  linksFullScreen,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);
  // console.log(`ismobile ****************** ${isMobile}`);
  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");
  const iconProps = { width: "28px", color: "textSubtle", style: { cursor: "pointer" } };
  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? "/"}
          cakePriceUsd={cakePriceUsd}
          priceLink={priceLink}
          isMobile={isMobile}
        />
        {!isMobile && (
          <NavBar
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            links={links}
            linksFullScreen={linksFullScreen}
            priceLink={priceLink}
          />
        )}
        <Flex>
          {!isMobile && (
            <div style={{ display: "inherit" }}>
              <Link
                external
                key="gitbook"
                href="https://dumplingswapdefi.gitbook.io/dumplingswap/"
                aria-label="gitbook"
                mr="1"
              >
                <GitbookIcon {...iconProps} />
              </Link>
              <Link external key="tt" href="https://twitter.com/dumpling_swap" aria-label="twitter" mr="1">
                <TwitterIcon {...iconProps} />
              </Link>
              <Link external key="tg" href="https://t.me/dumplingswap_official" aria-label="telegram" mr="1">
                <TelegramIcon {...iconProps} />
              </Link>
              <Link external key="medium" href="https://dumplingswapdefi.medium.com/" aria-label="medium" mr="1">
                <MediumIcon {...iconProps} />
              </Link>
              <Link external key="git" href="https://github.com/dumplingswap" aria-label="github" mr="1">
                <GithubIcon {...iconProps} />
              </Link>
            </div>
          )}
          <UserBlock account={account} login={login} logout={logout} />
          {profile && <Avatar profile={profile} />}
        </Flex>
      </StyledNav>
      <BodyWrapper>
        {isMobile && (
          <Panel
            isPushed={isPushed}
            isMobile={isMobile}
            showMenu={showMenu}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            pushNav={setIsPushed}
            links={links}
            priceLink={priceLink}
          />
        )}
        <Inner isPushed={isPushed} showMenu={showMenu} isMobile={isMobile}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
