import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be downloaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabins could not deleted");
}

export async function createEditCabin(newCabin, id) {
  //Image var mi kontrol ediyoruz(string tür)
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl); //fotograf subapase ile baslamiyosa yenidir

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  ); //fotograf yeniyse basina random sayi ekliyoruz

  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create / Edit Cabin

  let query = supabase.from("cabins");

  //A) CREATE
  if (!id) {
    // eslint-disable-next-line no-unused-vars
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //B)EDIT
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) throw new Error("Cabin could not be created");

  //2. Upload Image
  if (hasImage) return data;

  const { error: errorImg } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (errorImg) {
    deleteCabin(data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

// export async function updateCabin() {
//   const { data, error } = await supabase
//     .from("cabins")
//
// }
