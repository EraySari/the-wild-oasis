import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  //PAGINATION
  const page = searchParams.get("page");

  const pagination = !page ? null : { field: "page", value: page };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, pagination], //dependency array
    queryFn: () => getBooking({ filter }),
  });
  return { bookings, isLoading, error };
}
