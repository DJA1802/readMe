import React from 'react';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';
import { NavbarSideItems } from '.';

const NavbarSideMobile = () => {
  const visible = true;
  return (
    <Sidebar
      as={Menu}
      animation="uncover"
      width="thin"
      visible={visible}
      vertical
      inverted
    >
      <NavbarSideItems />
    </Sidebar>
  );
};

export default NavbarSideMobile;
