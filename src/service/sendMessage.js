import { supabaseClient } from "../helpers/supabaseClient";

export function sendMessage({newMessage, setMessage, userLoggedIn}) {
  const message = {
      de: userLoggedIn,
      texto: newMessage,
  };

  supabaseClient.from('mensagens').insert([message]).then(({ data }) => {
      console.log(data);
  })
  setMessage('');
}