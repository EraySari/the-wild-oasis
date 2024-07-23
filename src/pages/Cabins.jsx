import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row>
        <CabinTable />
        <Button
          size="large"
          variations="primary"
          onClick={() => setShowForm((show) => !show)}
        >
          Add new cabin
        </Button>

        {showForm ? <CreateCabinForm show={setShowForm} /> : ""}
      </Row>
    </>
  );
}

export default Cabins;
