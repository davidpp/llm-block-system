# LLM-Block-System
## Technical Design Document (TDD)

This document outlines the technical implementation of the LLM-Block-System for NextJS, focusing on a streamlined approach for a single developer using AI assistance.

## 1. System Architecture

The system consists of four main layers:

1. **LLM Communication** - Handles interaction with LLMs using Vercel AI SDK
2. **Block Management** - Processes LLM responses into block structures
3. **State Management** - Manages application state with React context and hooks
4. **Rendering** - Displays blocks, errors, and explanations

### High-Level Architecture

```
┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│                   │     │                   │     │                   │
│  LLM Provider     │◄────┤  Block Manager    │◄────┤  React Components │
│  (Vercel AI SDK)  │     │                   │     │                   │
│                   │     │                   │     │                   │
└───────┬───────────┘     └───────┬───────────┘     └───────────────────┘
        │                         │                          ▲
        │                         │                          │
        ▼                         ▼                          │
┌───────────────────┐     ┌───────────────────┐     ┌───────┴───────────┐
│                   │     │                   │     │                   │
│  JSON Stream      │────►│  Block System     │────►│  Block Renderer   │
│  Parser           │     │  Context          │     │                   │
│                   │     │                   │     │                   │
└───────────────────┘     └───────────────────┘     └───────────────────┘
```

## 2. Key Components

### Core Components

#### `BlockSystemProvider`
The central component that initializes the system and provides context.

```tsx
interface BlockSystemProviderProps {
  children: React.ReactNode;
  blockRegistry: BlockRegistry;
  llmConfig?: LLMConfig;
  initialContent?: BlockContent[];
}

<BlockSystemProvider
  blockRegistry={yourBlocks}
  llmConfig={{ model: "gpt-4" }}
>
  {children}
</BlockSystemProvider>
```

#### `BlockRenderer`
Renders blocks based on the current state.

```tsx
interface BlockRendererProps {
  errorComponent?: React.ComponentType<ErrorProps>;
  loadingComponent?: React.ComponentType;
  showBoundaries?: boolean;
}

<BlockRenderer 
  errorComponent={CustomError}
  showBoundaries={true}
/>
```

#### `ExplanationRenderer`
Renders explanations for blocks.

```tsx
interface ExplanationRendererProps {
  component?: React.ComponentType<ExplanationProps>;
  showAll?: boolean;
}

<ExplanationRenderer 
  component={CustomExplanation}
  showAll={false}
/>
```

#### `ContentPrompt`
Component for sending prompts to the LLM.

```tsx
interface ContentPromptProps {
  onSubmit?: (result: BlockContent[]) => void;
  initialPrompt?: string;
  inputComponent?: React.ComponentType<PromptInputProps>;
}

<ContentPrompt 
  onSubmit={handleNewContent}
  initialPrompt="Create a pricing section"
/>
```

### Hook APIs

#### `useBlockSystem`
Primary hook for accessing block system state and functions.

```tsx
const {
  blocks,
  explanations,
  status,
  setBlocks,
  generateContent,
  isLoading,
  error
} = useBlockSystem();
```

#### `useBlockExplanations`
Hook for accessing and controlling explanations.

```tsx
const {
  explanations,
  getExplanationForBlock,
  showExplanation,
  hideExplanation
} = useBlockExplanations(blockId?);
```

## 3. Data Models & Types

### Core Types

```typescript
// Block identification and content
type BlockId = string;

interface BlockContent {
  id: BlockId;
  type: "existing" | "new";
  component: string;
  props: Record<string, any>;
  children?: BlockContent[];
  meta?: BlockMetadata;
}

interface BlockMetadata {
  explanation?: string;
  confidence?: number;
  tags?: string[];
}

// Registry types
interface BlockRegistry {
  [componentName: string]: {
    component: React.ComponentType<any>;
    schema?: ZodSchema;
  }
}

// System state
interface BlockSystemState {
  blocks: BlockContent[];
  explanations: Record<BlockId, string>;
  status: "idle" | "loading" | "success" | "error";
  error?: Error;
}

// LLM Configuration
interface LLMConfig {
  model: string;
  temperature?: number;
  maxTokens?: number;
  streamingFunctions?: boolean;
}
```

### LLM Response Schema

```typescript
// Expected response from LLM (to be validated with Zod)
interface LLMBlockResponse {
  blocks: {
    id: string;
    type: "existing" | "new";
    component: string;
    props: Record<string, any>;
    children?: LLMBlockResponse["blocks"];
  }[];
  summary?: string;
  structure?: string;
}

// Explanation response schema
interface LLMExplanationResponse {
  explanations: {
    blockId: string;
    explanation: string;
  }[];
  overallExplanation?: string;
}
```

## 4. Implementation Details

### File Structure

```
src/
├── lib/
│   ├── block-system/
│   │   ├── types.ts             # Type definitions
│   │   ├── parser.ts            # JSON stream parsing
│   │   ├── context.tsx          # React context
│   │   ├── provider.tsx         # BlockSystemProvider
│   │   ├── schema.ts            # Zod schemas
│   │   └── llm.ts               # LLM communication
│   └── utils/
│       ├── validation.ts        # Validation helpers
│       └── streaming.ts         # Stream processing
├── components/
│   ├── block-system/
│   │   ├── BlockRenderer.tsx    # Main block renderer
│   │   ├── ExplanationRenderer.tsx  # Explanation display
│   │   ├── ContentPrompt.tsx    # User prompt component
│   │   ├── ErrorBoundary.tsx    # Error handling
│   │   └── BlockBoundary.tsx    # Debug visual boundaries
│   └── ui/
│       ├── Loading.tsx          # Default loading component
│       ├── ErrorDisplay.tsx     # Default error display
│       └── Explanation.tsx      # Default explanation component
└── hooks/
    ├── useBlockSystem.ts        # Main system hook
    ├── useBlockExplanations.ts  # Explanations hook
    └── useBlockRegistry.ts      # Registry utilities
```

### Key Implementation Steps

1. **Set up project structure and dependencies**
   - Create a NextJS project with TypeScript
   - Install dependencies: Vercel AI SDK, Zod, React

2. **Create core types and schemas**
   - Implement TypeScript interfaces
   - Create Zod validation schemas

3. **Implement context and provider**
   - Create React context for block system
   - Implement BlockSystemProvider

4. **Build LLM communication layer**
   - Integrate Vercel AI SDK
   - Implement JSON streaming parser

5. **Create rendering components**
   - Implement BlockRenderer
   - Create ErrorBoundary components
   - Build ExplanationRenderer

6. **Implement hook APIs**
   - Create useBlockSystem hook
   - Implement useBlockExplanations

7. **Build UI components**
   - Create default Loading component
   - Implement ErrorDisplay component
   - Build BlockBoundary for debugging

8. **Create examples and documentation**
   - Build a simple example page
   - Document component usage

## 5. LLM Integration

### Prompt Structure

The system will use a structured prompt to communicate with the LLM:

```
You are a content block generator for a NextJS website. Your task is to generate or reference content blocks based on the user's request.

Available block types:
{{blockTypesDescription}}

When generating a response, you must follow this JSON format:
{
  "blocks": [
    {
      "id": "unique-id",
      "type": "existing" | "new",
      "component": "ComponentName",
      "props": { ... }
    }
  ],
  "summary": "Brief summary of content created",
  "structure": "Description of page structure"
}

IMPORTANT: 
- For existing blocks, use type: "existing" and provide the id of the block
- For new blocks, use type: "new" and provide all required props
- Use appropriate prop types as specified in the block descriptions
```

### Vercel AI SDK Integration

```typescript
import { streamJsonResponse } from '@vercel/ai';
import { createParser } from 'eventsource-parser';

export async function generateBlocks(
  prompt: string, 
  blockTypes: string,
  config: LLMConfig
): Promise<ReadableStream> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: buildSystemPrompt(blockTypes) },
        { role: 'user', content: prompt }
      ],
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 2000,
      stream: true,
      response_format: { type: "json_object" }
    }),
  });

  return streamJsonResponse(response);
}
```

## 6. Implementation Plan

### Phase 1 (MVP)

1. **Core Framework**
   - Set up project structure
   - Implement types and core context
   - Create basic BlockRenderer
   - Integrate Vercel AI SDK

2. **Basic UI and Stream Handling**
   - Implement JSON streaming parser
   - Build default UI components
   - Create basic error handling
   - Implement simple example

### Phase 2

1. **Enhanced Features**
   - Add explanation system
   - Implement debug visualization
   - Create more robust error handling
   - Add validation with Zod

2. **Polish and Examples**
   - Refine UI components
   - Create comprehensive examples
   - Add documentation
   - Performance optimizations

## 7. Testing Approach

Focus on key testing areas:

1. **Unit Tests**
   - Block parsing logic
   - Context state management
   - Validation functions

2. **Integration Tests**
   - LLM response handling
   - Block rendering pipeline
   - Error recovery

3. **Manual Testing Scenarios**
   - Test with various LLM responses
   - Verify streaming behavior
   - Check error handling

## 8. AI Assistance Notes

When using AI to help implement this system:

1. **Code Generation Approach**
   - Start with skeleton implementations of core files
   - Use AI to generate component implementations
   - Have AI review type definitions

2. **Testing with AI**
   - Use AI to generate test cases
   - Have AI review error handling

3. **Incremental Development**
   - Build small pieces and test each
   - Focus on functional MVP first
   - Use AI to refactor and optimize

## 9. Next Steps

After MVP completion:

1. Add support for hierarchical blocks
2. Implement more sophisticated validation
3. Create a comprehensive demo project
4. Add persistence hooks for content saving
5. Improve documentation with more examples
