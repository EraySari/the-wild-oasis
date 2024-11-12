/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { Toaster } from "react-hot-toast";
import { useCreateEditCabin } from "./useCreateEditCabin";
import Modal from "../../ui/Modal";

function CreateCabinForm({ editCabin = {}, onCloseModal }) {
  const { id: editId, ...editValues } = editCabin; //edit kabini idsinden ayirizoruz. apiCabinste ayri lazim
  //editValues formun default valuesi icin kullaniyoruz. Kullanici degistirmedigi sürece bu degerle gidecek.
  const isEdit = Boolean(editCabin.id);

  //eger isEdit true ise default value olarak suanki bilgileri giriyoruz forma
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });

  const { errors } = formState; //errorlari kullanmak icin aliyoruz(prop olarak vs)

  const { isCreating, isEditing, editMutate, createMutate } =
    useCreateEditCabin();

  const onSubmit = function (data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    isEdit //data formun girilen verilerinden geliyor
      ? editMutate({ newCabinData: { ...data, image }, id: editId })
      : createMutate({ ...data, image: image });
  };

  const onError = function (error) {
    console.log(error);
  };

  const isProcess = isEditing || isCreating;

  return (
    <>
      <Form
        type={onCloseModal ? "modal" : "regular"}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <FormRow label={"Cabin name"} errors={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isProcess}
            {...register("name", {
              required: "This field is required",
              minLength: 2,
            })}
          />
        </FormRow>

        <FormRow label={"Max Capacity"} errors={errors?.maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            disabled={isProcess}
            {...register("maxCapacity", {
              required: "This field is required",
              min: { value: 1, message: "Capacity should be at least 1" },
              max: { value: 6, message: "Capacity should be max 6" },
            })}
          />
        </FormRow>

        <FormRow label={"Regular Price"} errors={errors?.regularPrice?.message}>
          <Input
            type="number"
            id="regularPrice"
            disabled={isProcess}
            {...register("regularPrice", {
              min: { value: 100, message: "Regular price should be " },
            })}
          />
        </FormRow>

        <FormRow label={"Discount"} errors={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            disabled={isProcess}
            {...register("discount", {
              required: "This field is required",
              validate: (value) =>
                value < Number(getValues().regularPrice) ||
                "Discount should be less than regular price",
              //validate o anki girilen degeri alir ve fonksiyon false ise error verir
            })}
          />
        </FormRow>

        <FormRow label={"Description"} errors={errors?.description?.message}>
          <Textarea
            type="number"
            id="description"
            disabled={isProcess}
            {...register("description", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label={"Cabin photo"}>
          <FileInput
            id="image"
            accept="image/*"
            disabled={isProcess}
            {...register("image", {
              required: isEdit ? false : "This field is required",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button disabled={isCreating}>
            {isEdit ? "Edit cabin" : "Create Cabin"}
          </Button>
        </FormRow>
      </Form>

      <Toaster />
    </>
  );
}

export default CreateCabinForm;
