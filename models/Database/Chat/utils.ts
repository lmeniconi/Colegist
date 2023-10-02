const CHAT_BASE_PATH = "/dashboard/databases/:databaseId/chats"

export function getChatPath(
  databaseId: string | number,
  chatId: string | number
) {
  return (
    CHAT_BASE_PATH.replace(":databaseId", databaseId.toString()) + "/" + chatId
  )
}
