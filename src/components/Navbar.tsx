/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav css={navbarStyle}>
        <div className="title">navbar</div>
      </nav>
      <Outlet />
    </>
  );
}

const navbarStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  border-bottom: 2px solid black;

  .title {
    font-size: 2rem;
    font-weight: 600;
  }
`;
