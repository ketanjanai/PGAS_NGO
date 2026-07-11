'use server';
/**
 * @fileOverview An AI agent that converts raw project notes and data into heartwarming impact stories.
 *
 * - generateImpactStory - A function that generates a human-centric impact story.
 * - GenerateImpactStoryInput - The input type for the generateImpactStory function.
 * - GenerateImpactStoryOutput - The return type for the generateImpactStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImpactStoryInputSchema = z.object({
  rawFieldNotes: z.string().describe('Detailed raw field notes and observations from the project.'),
  keyDataPoints: z
    .array(z.string())
    .optional()
    .describe('Key quantitative data or metrics related to the project impact.'),
  beneficiaryName: z.string().optional().describe('The name of the individual or group benefiting from the project.'),
  beneficiaryVillage: z.string().optional().describe('The village where the impact occurred.'),
  programArea:
    z.enum(['Rural Education', 'Improving Hygiene Facilities', 'Agriculture', 'Health', 'Youth Development'])
      .optional()
      .describe('The specific program area of the project. Must be one of the predefined categories.'),
});
export type GenerateImpactStoryInput = z.infer<typeof GenerateImpactStoryInputSchema>;

const GenerateImpactStoryOutputSchema = z.object({
  title: z.string().describe('A heartwarming and engaging title for the impact story.'),
  story:
    z.string()
      .describe(
        'A concise (100-150 words) and heartwarming impact story, focusing on the human element and positive transformation. Avoid corporate jargon or NGO clichés.'
      ),
  keyImpacts:
    z.array(z.string())
      .describe('A bulleted list of 2-3 key tangible impacts or achievements highlighted in the story.'),
  sentiment: z.enum(['Very Positive', 'Positive', 'Neutral']).describe('The overall emotional sentiment of the generated story.'),
});
export type GenerateImpactStoryOutput = z.infer<typeof GenerateImpactStoryOutputSchema>;

export async function generateImpactStory(input: GenerateImpactStoryInput): Promise<GenerateImpactStoryOutput> {
  return generateImpactStoryFlow(input);
}

const generateImpactStoryPrompt = ai.definePrompt({
  name: 'generateImpactStoryPrompt',
  input: {schema: GenerateImpactStoryInputSchema},
  output: {schema: GenerateImpactStoryOutputSchema},
  prompt: `You are an expert storyteller for Shri Padmavati Grameen Abhivruddhi Sansthe, an organization focused on empowering communities in rural Karnataka. Your task is to transform raw project field notes and data into concise, heartwarming impact stories.

The stories should focus on the people and the community as the heroes, with the organization as an enabler. The tone should evoke hope and action, not charity. Avoid corporate language, NGO clichés, and overly technical jargon. Each story should be approximately 100-150 words.

Here are the details to create the story:

Raw Field Notes:
{{{rawFieldNotes}}}

{{#if keyDataPoints}}
Key Data Points:
{{#each keyDataPoints}}- {{{this}}}
{{/each}}{{/if}}

{{#if beneficiaryName}}
Beneficiary Name: {{{beneficiaryName}}}
{{/if}}

{{#if beneficiaryVillage}}
Beneficiary Village: {{{beneficiaryVillage}}}
{{/if}}

{{#if programArea}}
Program Area: {{{programArea}}}
{{/if}}

Based on the above information, generate a compelling impact story. The output should be a JSON object conforming to the provided schema.
`,
});

const generateImpactStoryFlow = ai.defineFlow(
  {
    name: 'generateImpactStoryFlow',
    inputSchema: GenerateImpactStoryInputSchema,
    outputSchema: GenerateImpactStoryOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await generateImpactStoryPrompt(input);
      return output!;
    } catch (error) {
      console.error("Error in generateImpactStoryFlow:", error);
      throw error;
    }
  }
);
