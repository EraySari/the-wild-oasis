import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabin").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabins(cabinId) {
  const { data, error } = await supabase
    .from("cabin")
    .delete()
    .eq("id", cabinId);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function addNewCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabin")
    .insert([newCabin])
    .select();

  if (error) {
    throw new Error("Cabin could not be added");
  }

  return data;
}
