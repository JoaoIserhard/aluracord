import { supabaseClient } from "../helpers/supabaseClient";

export function loadMessageList({setMessageList}) {
  return (
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setMessageList(data);
      }));
}
