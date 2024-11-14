import { HfInference } from '@huggingface/inference'

// Certifique-se de que a variável de ambiente está sendo carregada corretamente
const API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY

if (!API_KEY) {
  throw new Error('HUGGINGFACE_API_KEY não está definida')
}

const hf = new HfInference(API_KEY)

export async function generateResponse(prompt: string) {
  try {
    const response = await hf.textGeneration({
      model: 'EleutherAI/gpt-j-6B',
      inputs: `Você é um especialista em economia de energia. Responda de forma clara e objetiva:
              ${prompt}`,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.2
      }
    })
    
    return response.generated_text
  } catch (error) {
    console.error('Erro ao gerar resposta:', error)
    return 'Desculpe, não foi possível gerar uma resposta no momento.'
  }
} 