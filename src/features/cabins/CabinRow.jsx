/* eslint-disable react/prop-types */
import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateEditCabin } from "./useCreateEditCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  //{} bunu koyarsak ...{} gibi düsün

  // eslint-disable-next-line no-unused-vars
  const { isDeleting, deleteMutate } = useDeleteCabin();
  const { isCreating, createMutate } = useCreateEditCabin();

  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabinData;

  // eslint-disable-next-line no-unused-vars
  const editCabin = {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  };

  function handleDuplicate() {
    createMutate({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{regularPrice}</Price>
      {discount ? <Discount>{discount}</Discount> : <span>&mdash;</span>}

      <div>
        <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opensWindowName="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm editCabin={editCabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opensWindowName="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={() => deleteMutate(cabinID)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
