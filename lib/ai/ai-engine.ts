export type AiTaskType = 'summarize' | 'rewrite' | 'grammar' | 'keypoints' | 'qa';

export interface AiTaskOptions {
  task: AiTaskType;
  content: string;
  tone?: 'professional' | 'casual' | 'concise' | 'academic';
  customPrompt?: string;
  apiKey?: string;
}

export interface AiTaskResult {
  output: string;
  wordCount: number;
  tokensUsed?: number;
}

export async function executeAiTask(options: AiTaskOptions): Promise<AiTaskResult> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      task: options.task,
      content: options.content,
      tone: options.tone || 'professional',
      customPrompt: options.customPrompt,
      apiKey: options.apiKey || (typeof window !== 'undefined' ? localStorage.getItem('nexora_ai_key') : undefined),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'AI request failed. Please check API key or configuration.');
  }

  return await response.json();
}
