# Data Model: Kubernetes for Absolute Beginners Textbook

## Entities

### Chapter
- **Fields**:
  - id: string (unique identifier for the chapter)
  - title: string (chapter title)
  - content: string (Markdown content of the chapter)
  - order: number (sequence order in the textbook)
  - wordCount: number (approximate word count)
  - estimatedReadingTime: number (in minutes)
  - language: string (language code, e.g., 'en', 'ur')
  - relatedChapters: array of Chapter IDs (for navigation)

- **Validation rules**:
  - Title must be 5-100 characters
  - Content must be between 1000-2000 words
  - Order must be between 1-6 for the main textbook
  - Language must be one of the supported languages (en, ur)

- **Relationships**:
  - One-to-many with CodeExample (a chapter can contain multiple code examples)
  - One-to-many with Diagram (a chapter can contain multiple diagrams)

### CodeExample
- **Fields**:
  - id: string (unique identifier)
  - type: string (language type: 'yaml', 'dockerfile', 'bash', etc.)
  - code: string (the actual code content)
  - description: string (brief explanation of what the code does)
  - chapterId: string (reference to the parent chapter)

- **Validation rules**:
  - Code must be syntactically valid for the specified type
  - Description must be 10-200 characters
  - Must be associated with a valid chapter

- **Relationships**:
  - Many-to-one with Chapter (belongs to a chapter)

### Diagram
- **Fields**:
  - id: string (unique identifier)
  - type: string (diagram type: 'mermaid', 'image', etc.)
  - content: string (the diagram definition or path to image)
  - title: string (brief title for the diagram)
  - altText: string (accessibility text for the diagram)
  - chapterId: string (reference to the parent chapter)

- **Validation rules**:
  - Content must be valid Mermaid syntax or valid image path
  - Title must be 5-100 characters
  - Alt text must be provided for accessibility
  - Must be associated with a valid chapter

- **Relationships**:
  - Many-to-one with Chapter (belongs to a chapter)

### User
- **Fields**:
  - id: string (unique identifier)
  - preferredLanguage: string (default language preference: 'en', 'ur')
  - currentChapter: string (ID of the chapter the user is currently reading)
  - progress: number (percentage of textbook completed)
  - quizResults: array of objects (quiz results for each chapter)

- **Validation rules**:
  - Preferred language must be one of the supported languages
  - Current chapter must be a valid chapter ID
  - Progress must be between 0-100

- **State transitions**:
  - User starts with default language (English)
  - User can update language preference
  - Progress updates as user completes chapters

## State Transitions

### Chapter Progression
- Initial state: User begins with Chapter 1
- Transition 1: User completes Chapter 1 → Progress updates, Chapter 2 becomes available
- Transition 2: User progresses through chapters sequentially
- Final state: User completes Chapter 6 → Textbook completion achieved

### Language Preference
- Initial state: Default language is English
- Transition: User selects Urdu from language toggle → Content updates to Urdu
- Transition: User selects English from language toggle → Content updates to English