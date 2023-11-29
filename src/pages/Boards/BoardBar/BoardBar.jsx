import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const MENU_STYLE = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};
function BoardBar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.soTay.boardHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          onClick={() => {}}
          icon={<DashboardIcon />}
          label="Board Name"
        />
        <Chip
          sx={MENU_STYLE}
          onClick={() => {}}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
        />

        <Chip
          sx={MENU_STYLE}
          onClick={() => {}}
          icon={<BoltIcon />}
          label="Action"
        />

        <Chip
          sx={MENU_STYLE}
          onClick={() => {}}
          icon={<FilterListIcon />}
          label="Filter"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white" },
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={6}
          sx={{
            gap: "5px",
            "& .MuiAvatar-root": {
              width: 30,
              height: 30,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              "&:first-of-type": { bgcolor: "#a4b0be" },
            },
          }}
        >
          <Tooltip title="avatar">
            <Avatar
              alt="Remy Sharp"
              src="http://monitor.tscovn.com:9001/Data/GA/hungvo/default.jpg"
            />
          </Tooltip>
          <Tooltip title="avatar">
            <Avatar
              alt="Remy Sharp"
              src="http://monitor.tscovn.com:9001/Data/GA/hungvo/1.jpg"
            />
          </Tooltip>
          <Tooltip title="avatar">
            <Avatar
              alt="Remy Sharp"
              src="http://monitor.tscovn.com:9001/Data/GA/hungvo/2.jpg"
            />
          </Tooltip>
          <Tooltip title="avatar">
            <Avatar
              alt="Remy Sharp"
              src="http://monitor.tscovn.com:9001/Data/GA/hungvo/3.jpg"
            />
          </Tooltip>
          <Tooltip title="avatar">
            <Avatar
              alt="Remy Sharp"
              src="http://monitor.tscovn.com:9001/Data/GA/hungvo/4.jpg"
            />
          </Tooltip>
          <Tooltip title="avatar">
            <Avatar
              alt="Remy Sharp"
              src="http://monitor.tscovn.com:9001/Data/GA/hungvo/5.jpg"
            />
          </Tooltip>
          <Tooltip title="avatar">
            <Avatar
              alt="Remy Sharp"
              src="http://monitor.tscovn.com:9001/Data/GA/hungvo/6.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
