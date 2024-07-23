/* eslint-disable react/prop-types */
import styled from "styled-components";
import { deleteCabins } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabinData }) {
  const {
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    // eslint-disable-next-line no-unused-vars
    id: cabinId,
  } = cabinData;

  const queryClient = useQueryClient(); //app.jsteki queryclienti verir

  // eslint-disable-next-line no-unused-vars
  const { isLoading: isDeleting, mutate } = useMutation({
    //mutate fonksiyonunu cagirdigimizda mutationFne verilen fonksiyonu cagirir
    mutationFn: deleteCabins,
    onSuccess: () => {
      toast.success("Cabin has deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"], //hangi verinin invalidated(catch'i gecersiz  kilma) olmasi gerektigini söylüyoruz
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity}</div>
      <Price>{regularPrice}</Price>
      <Discount>{discount}</Discount>
      <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
        Delete
      </button>
    </TableRow>
  );
}

export default CabinRow;
