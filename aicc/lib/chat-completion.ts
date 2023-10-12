import { ChatOpenAI } from "langchain/chat_models/openai"
import { HumanMessage, AIMessage, SystemMessage, BaseMessage, LLMResult } from "langchain/schema"
import { ChatItem } from "@/lib/models/ChatItem"
import { sanitizeToASCII } from "@/lib/utils"


const chatLLM = new ChatOpenAI({
    streaming: true,
    openAIApiKey: "a_simple_password",
    configuration: {
        basePath: "https://llm.bytebooster.dev",
    },
    temperature: 0.7,
    topP: 0.95,
    maxTokens: 512,
})

export async function chatCompletion(
    messages: ChatItem[],
    onToken: (token: string) => void,
    onLLMEnd: (output: LLMResult) => void,
    onFinished: () => void,
) {
    
    try {
        // Get responses from AI
        const convMessages = convertMessages(messages)
        const response = await chatLLM.call(convMessages, {
            callbacks: [
                {
                    handleLLMNewToken(token: string) {
                        onToken(token)
                    },
                    handleLLMEnd(output: LLMResult) {
                        onLLMEnd(output)
                    },
                }
            ]
        })
        onFinished()
        return response.content.trim()
    }
    catch (error) {
        onFinished()
        return `Error when getting answers from AI. Please try again later. (${error})`
    }
}

function convertMessages(messages: ChatItem[]): BaseMessage[] {
    const messagesPrep: BaseMessage[] = []

    for (const message of messages) {
        if (message.role.toLowerCase() === "system") { messagesPrep.push(new SystemMessage(message.content)) }
        if (message.role.toLowerCase() === "user") { messagesPrep.push(new HumanMessage(message.content)) }
        if (message.role.toLowerCase() === "assistant") { messagesPrep.push(new AIMessage(message.content)) }
    }

    return messagesPrep
}
