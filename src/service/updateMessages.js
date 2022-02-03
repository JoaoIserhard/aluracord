import { supabaseClient } from '../helpers/supabaseClient';

export function updateMessages(addMessage) {
  return supabaseClient
      .from('mensagens')
      .on('INSERT', (response) => {
          addMessage(response.new);
      })
      .subscribe();
}

