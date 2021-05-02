import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import L from '../../localization/LocalizedText';
import CreateStudyItem from "./CreateStudyItem";

export interface HeaderProps {
  showBackButton: boolean,
}

export interface HeaderState {
  username: string,
}

export interface HeaderDispatch {
  onLogoutClick: () => void,
}

const Header: React.FC<HeaderProps & HeaderState & HeaderDispatch> = ({username, showBackButton, onLogoutClick}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null); // Close the menu
  }

  function handleLogoutClick() {
    handleClose();

    onLogoutClick();
  }

  return (
    <header>
      <a className="logo-container" href="/">
        <p id="logo">Card Sorter</p>
        {
          showBackButton &&
          <button id="back">
            <span className="arrow">
              <span className="shaft"/>
            </span>
            <span className="content">{L.text && L.text.toFront}</span>
          </button>
        }
      </a>
      <CreateStudyItem />

      <div className='ml-xxs'>
        <Button aria-controls="user-menu" aria-haspopup="true" onClick={handleClick} className='btn-overrides'
                startIcon={<span className="material-icons">arrow_drop_down</span>}>
          {username}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
