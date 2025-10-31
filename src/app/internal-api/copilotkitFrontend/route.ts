// app/api/copilotkit/route.ts
import { CopilotRuntime, GroqAdapter, copilotRuntimeNextJSAppRouterEndpoint } from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const serviceAdapter = new GroqAdapter({
  groq,
  model: "qwen/qwen3-32b",
});

const runtime = new CopilotRuntime();

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
      endpoint: "/internal-api/copilotkitFrontend",
  });
  return handleRequest(req);
};   