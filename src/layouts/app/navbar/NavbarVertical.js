import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { styled, useTheme } from "@mui/material/styles";
import { Drawer, Stack } from "@mui/material";
import useCollapseDrawer from "../../../hooks/useCollapseDrawer";
import cssStyles from "../../../utils/cssStyles";
import { NAVBAR } from "../../../config";
import Logo from "../../../components/Logo";
import Scrollbar from "../../../components/Scrollbar";
import { NavSectionVertical } from "../../../components/nav-section";
import navConfig from "./NavConfig";
import NavbarAccount from "./NavbarAccount";
import CollapseButton from "./CollapseButton";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();

  const { pathname } = useRouter();

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [isOpenSidebar, onCloseSidebar, pathname]);

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
    >
      <Drawer
        open
        variant="persistent"
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        PaperProps={{
          sx: {
            width: NAVBAR.DASHBOARD_WIDTH,
            borderRightStyle: "dashed",
            bgcolor: "background.default",
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.standard,
              }),
            ...(isCollapse && {
              width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
            }),
            ...(collapseHover && {
              ...cssStyles(theme).bgBlur(),
              boxShadow: (theme) => theme.customShadows.z24,
            }),
          },
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            "& .simplebar-content": {
              height: 1,
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              pt: 3,
              pb: 2,
              px: 2.5,
              flexShrink: 0,
              ...(isCollapse && { alignItems: "center" }),
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Logo />
              {!isCollapse && (
                <CollapseButton
                  onToggleCollapse={onToggleCollapse}
                  collapseClick={collapseClick}
                />
              )}
            </Stack>
            <NavbarAccount isCollapse={isCollapse} />
          </Stack>
          <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} />
        </Scrollbar>
      </Drawer>
    </RootStyle>
  );
}
