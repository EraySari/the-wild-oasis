/* eslint-disable react/prop-types */

import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// eslint-disable-next-line no-unused-vars
function Filter({ filterField, options }) {
  //useSearchParams kancası, geçerli konum için URL'deki
  //sorgu dizesini okumak ve değiştirmek için kullanılır.
  //React'in kendi useState kancası gibi, useSearchParams da
  //iki değerden oluşan bir dizi döndürür: geçerli konumun
  //arama parametreleri ve bunları güncellemek için kullanılabilecek bir işlev.
  //React'in useState kancası gibi, setSearchParams da işlevsel güncellemeleri destekler.
  // Bu nedenle, bir searchParams alan ve güncellenmiş bir sürüm döndüren
  // bir işlev sağlayabilirsiniz.
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value); // filterField parametresinin değerini "value" ile değiştirir veya ekler.

    //   if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams); // Güncellenen searchParams'i URL'ye yansıtır.
    //console.log(searchParams.get(filterField));
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={currentFilter === option.value}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
