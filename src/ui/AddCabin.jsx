import Button from "./Button";
import Modal from "./Modal";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function AddCabin() {
  // new cabin butonuna basilirsa modal pencere acilir
  return (
    <Modal>
      <Modal.Open opensWindowName="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isModal, setIsModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsModal(!isModal)}>Add New Cabin</Button>
//       {isModal && ( //isModal aktifse open degilse close.(icerigi ise createcabinform)
//         <Modal onClick={() => setIsModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
