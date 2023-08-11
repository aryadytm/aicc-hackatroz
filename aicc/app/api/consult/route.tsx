import { NextResponse } from "next/server"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { HumanMessage, AIMessage, SystemMessage, BaseMessage } from "langchain/schema"
import { translate } from "@vitalets/google-translate-api"
import LanguageDetect from "languagedetect"
import { ChatItem } from "@/lib/models/ChatItem"
import { sanitizeToASCII } from "@/lib/utils"

const langDetect = new LanguageDetect()
langDetect.setLanguageType("iso2")

const chatLLM = new ChatOpenAI({
  streaming: false,
  openAIApiKey: "a_simple_password",
  configuration: {
    basePath: "https://llm.bytebooster.dev",
  },
})

export async function POST(request: Request) {
  const messages: ChatItem[] = (await request.json()).messages
  const response = await getAiAnswer(messages)
  return NextResponse.json({ response: response })
}

async function getAiAnswer(messages: ChatItem[]) {
  const message = sanitizeToASCII(messages[messages.length - 1].content)
  
  try {
    // Translate to English
    // const detection = langDetect.detect(message)[ 0 ][ 0 ]
    
    // if (detection !== "en") {
    //   const translation = await translate(message, { to: "en" })
    //   messages[messages.length - 1].content = translation.text
    // }
    
    // Get responses from AI
    const convMessages = convertMessages(messages)
    const response = await chatLLM.call(convMessages)

    // Translate the response back to the original language
    // if (detection !== "en") {
    //   const answer = await translate(response.content.trim(), { to: detection })
    //   return answer.text
    // } 
    
    return response.content.trim()
  }
  catch (error) {
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
