
"use client";

import { useState } from "react";
import { generateImpactStory, type GenerateImpactStoryOutput } from "@/ai/flows/generate-impact-story";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, Check, Share2, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function StoryGeneratorTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateImpactStoryOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const rawFieldNotes = formData.get("notes") as string;
    const beneficiaryName = formData.get("name") as string;
    const beneficiaryVillage = formData.get("village") as string;
    const programArea = formData.get("program") as any;

    try {
      const output = await generateImpactStory({
        rawFieldNotes,
        beneficiaryName: beneficiaryName || undefined,
        beneficiaryVillage: beneficiaryVillage || undefined,
        programArea: programArea || undefined,
      });
      setResult(output);
    } catch (err) {
      setError("Failed to generate story. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-secondary w-5 h-5" /> 
            Impact Story AI
          </CardTitle>
          <CardDescription>
            Input raw field notes to generate a heartwarming community story for the website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Beneficiary Name</Label>
                <Input id="name" name="name" placeholder="e.g. Laxmi Devi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="village">Village</Label>
                <Input id="village" name="village" placeholder="e.g. Shirahatti" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">Program Area</Label>
              <Select name="program">
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Women Empowerment">Women Empowerment</SelectItem>
                  <SelectItem value="Water & Sanitation">Water & Sanitation</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Youth Development">Youth Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Raw Field Notes</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                required
                className="min-h-[200px]" 
                placeholder="Describe what happened, the challenges faced, the intervention, and the emotional shift..."
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-primary h-12 text-lg">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate Impact Story"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {!result && !loading && !error && (
          <div className="h-full border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-muted/20">
            <Sparkles className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg">Generated stories will appear here.</p>
            <p className="text-sm">Human-centric narratives for your donors and partners.</p>
          </div>
        )}

        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-40 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <Card className="overflow-hidden border-2 border-secondary/20 shadow-xl bg-white">
              <div className="bg-secondary p-4 flex justify-between items-center">
                <span className="text-secondary-foreground font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" /> Ready for Website
                </span>
                <span className="text-[10px] uppercase font-black bg-white/20 px-2 py-1 rounded">
                  Sentiment: {result.sentiment}
                </span>
              </div>
              <CardContent className="p-8 space-y-6">
                <h2 className="text-3xl font-headline font-bold text-primary">{result.title}</h2>
                <div className="prose prose-zinc max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground italic font-headline">
                    {result.story}
                  </p>
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Key Impacts</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {result.keyImpacts.map((impact, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-medium">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1 bg-primary">Publish to CMS</Button>
                  <Button variant="outline" className="flex-1 gap-2"><Share2 className="w-4 h-4" /> Copy Story</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
