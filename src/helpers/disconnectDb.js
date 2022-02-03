import { updateMessages } from "../service/updateMessages"

export function disconectDb({setMessageList}) {
  const disconect = updateMessages((newMessage) => {
    setMessageList((currentList) => {
        return [
            newMessage,
            ...currentList,
        ]
    }
    )
  })
  
  return () => {
    disconect.unsubscribe();
} 
}
