const conversations = new Map<string, string>();

export const conversationRepository = {
   getLastRepsonseId(conversationId: string) {
      return conversations.get(conversationId);
   },
   setLastResponseId(conversationId: string, responseId: string) {
      conversations.set(conversationId, responseId);
   },
};
