import { supabase } from "../supabase/config";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export async function signUp(
  email: string,
  password: string
  ) {

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error){
    throw error;
  }

  return data;
}

export async function signIn(
  email: string,
  password: string
  ) {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error){
    throw error;
  }

  return data;
  
}

export async function role(id : string){

  const { data, error } = await supabase.from("Profiles")
    .select("role")
    .eq("id", id)
    .maybeSingle(); // Devolverá null si no existe, sin romper la app
  
  if (error){
    throw error;
  }

  return data;
  
}

export async function signOut():Promise<void>{

  try{
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    alert("Sesion cerrada con éxito");

  }catch(error){
    console.error("Error inesperado al cerrar sesión:", error)
  }

}

export async function getSession(){

  const { data ,error } = await supabase.auth.getSession();

  if (error) throw error;

  return data
}

export function onAuthStateChange( 
  callback?: (event: AuthChangeEvent,session: Session | null) => void
  ){

  const { data } = supabase.auth.onAuthStateChange((event,session) =>{
    console.log("Evento detectado:", event);
    console.log("Sesión del usuario:", session);

  // Si pasaste una función al ejecutar onAuthStateChange(), la ejecuta aquí
    if (callback) {
      callback(event, session);
    }
  });
  
  console.log(data.subscription)
  return data.subscription;
}

