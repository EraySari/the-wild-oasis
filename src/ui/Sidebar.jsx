import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

function Sidebar() {
  const Sidebar = styled.div`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);

    grid-row: 1/ -1;
  `;
  return (
    <Sidebar>
      <>
        <Logo />
        <MainNav />
      </>
    </Sidebar>
  );
}

export default Sidebar;
