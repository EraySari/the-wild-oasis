import styled from "styled-components";

function Header() {
  const StyledHeader = styled.div`
    background-color: var(--color-gray-50);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-gray-100);
  `;
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
