/* eslint-disable no-unused-vars */
import { Toaster } from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";
import { getCabinf } from "../../services/apiSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      maxBookingLength,
      minBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {}, //bos küme atiyoruz cünkü async islemi ile ilgili. Sonuclar hemen gelmeyecegi icin ilk olarak bos kume atiyoruz
    isLoading,
  } = useSettings();
  const { isSettingsEdit, settingsEditMutate } = useEditSettings();

  const handleSubmit = function (e, setting) {
    const { value } = e.target;

    settingsEditMutate({ [setting]: Number(value) });
    console.log(value, setting);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            disabled={isSettingsEdit}
            onBlur={(e) => handleSubmit(e, "minBookingLength")}
          />
        </FormRow>
        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            disabled={isSettingsEdit}
            onBlur={(e) => handleSubmit(e, "maxBookingLength")}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            disabled={isSettingsEdit}
            defaultValue={maxGuestsPerBooking}
            onBlur={(e) => handleSubmit(e, "maxGuestsPerBooking")}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            disabled={isSettingsEdit}
            defaultValue={breakfastPrice}
            onBlur={(e) => handleSubmit(e, "breakfastPrice")}
          />
        </FormRow>
      </Form>

      <button onClick={getCabinf}>Get Cabin</button>
      <Toaster />
    </>
  );
}

export default UpdateSettingsForm;
