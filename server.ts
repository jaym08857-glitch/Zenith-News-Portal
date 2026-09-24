import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Helper to safely get Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
    timestamp: new Date().toISOString()
  });
});

// AI Draft Article Generator using Gemini API
app.post("/api/ai/generate-article", async (req, res) => {
  try {
    const { topic, category, tone, targetAudience } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback demo response if GEMINI_API_KEY is not set
      return res.json({
        title: `The Future of ${topic}: Key Trends & Breakthroughs`,
        subtitle: `An in-depth analysis into how ${topic} is shaping tomorrow's digital landscape in the ${category || "Global"} sector.`,
        excerpt: `Discover the critical developments, expert insights, and strategic implications of ${topic} in our comprehensive report.`,
        content: `
### Executive Summary
The rapid evolution of **${topic}** is transforming industries worldwide. As technology advances, leaders and innovators must navigate shifting paradigms and emerging opportunities.

### Key Drivers and Market Dynamics
1. **Accelerated Adoption**: Across the globe, organizations are integrating solutions to scale efficiency.
2. **Regulatory & Ethical Considerations**: Standards are continuously evolving to safeguard user trust.
3. **Integration with Next-Gen Systems**: Seamless interoperability remains a top priority.

> "Innovation in ${topic} isn't just an option—it is becoming the foundational pillar of modern strategy."

### Looking Ahead
As we look to the coming quarters, staying ahead of trends in **${topic}** will be vital for sustained growth and competitive edge.
        `.trim(),
        metaTitle: `${topic}: Trends, Insights & Analysis | Global Chronicle`,
        metaDescription: `Read our comprehensive guide and latest insights on ${topic}. Expert editorial analysis on ${category || "General"} developments.`,
        tags: [topic.toLowerCase(), (category || "news").toLowerCase(), "insights", "trends", "analysis"]
      });
    }

    const prompt = `You are a senior chief editor for a top international news publication like Bloomberg, Reuters, or TechCrunch.
Draft a comprehensive, high-quality, SEO-optimized news/blog post on the topic: "${topic}".
Category: ${category || "Technology"}
Tone: ${tone || "Professional and Authoritative"}
Target Audience: ${targetAudience || "General Readers & Professionals"}

Please return ONLY valid JSON in the exact following structure without markdown code blocks:
{
  "title": "Compelling headline",
  "subtitle": "Informative subtitle",
  "excerpt": "A concise 2-sentence SEO excerpt",
  "content": "Full markdown-formatted article content with subheadings (###), bullet points, bold key terms, and a quote block (>). Minimum 350 words.",
  "metaTitle": "SEO meta title under 60 chars",
  "metaDescription": "SEO meta description under 155 chars",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "";
    try {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (e) {
      res.json({
        title: `Deep Dive into ${topic}`,
        subtitle: `Understanding the profound shifts in ${category || 'News'}`,
        excerpt: `A look at how ${topic} is re-shaping the future.`,
        content: text,
        metaTitle: `${topic} - In-Depth News Analysis`,
        metaDescription: `Discover the latest developments in ${topic}.`,
        tags: [topic, category || "News"]
      });
    }
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate article with AI" });
  }
});

// AI SEO Optimizer endpoint
app.post("/api/ai/optimize-seo", async (req, res) => {
  try {
    const { title, content } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        metaTitle: `${title ? title.slice(0, 50) : "Latest News"} | Chronicle`,
        metaDescription: `Stay informed with breaking coverage on ${title || "global events"}. Detailed analysis and expert perspectives.`,
        keywords: ["news", "breaking news", "analysis", "global chronicle", "trending"],
        suggestedHeadlines: [
          `Breaking Analysis: ${title}`,
          `Why ${title} Matters Right Now`,
          `Inside the Shifts of ${title}`
        ]
      });
    }

    const prompt = `Analyze this article title and content for search engine optimization (SEO):
Title: "${title}"
Content Summary: "${content ? content.slice(0, 300) : ''}"

Provide optimized SEO metadata in JSON format:
{
  "metaTitle": "SEO title strictly under 60 characters",
  "metaDescription": "Engaging description with target keywords under 155 characters",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "suggestedHeadlines": ["Alternative Catchy Title 1", "Alternative High-CTR Title 2", "SEO Keyword Title 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to optimize SEO" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Global Chronicle Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
