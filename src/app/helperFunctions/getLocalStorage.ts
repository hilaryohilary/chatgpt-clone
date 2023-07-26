import { chatHistory } from "./groupByDateCategory";

export const getInitialChatState = (chatId: string):chatHistory[] => {
    const storedChats:chatHistory[] = JSON.parse(localStorage.getItem('chat-history') || '[]');
    const storedChatState = storedChats.find((chat) => chat.id === chatId);
    if(storedChatState) {
        return [storedChatState];
    } else {
        const newChat: chatHistory = {
            id: chatId,
            date: new Date().toLocaleString(),
            chatSessions: []
        };
        localStorage.setItem('chat-history', JSON.stringify([...storedChats, newChat]));
        return [newChat];
    }
}

export const updateChatState = (chatId: string, newChat: chatHistory) =>{
    const storedChatState = getInitialChatState(chatId);
    const updatedChatStated = [...storedChatState, newChat];
    localStorage.setItem('chat-history', JSON.stringify(updatedChatStated));
}