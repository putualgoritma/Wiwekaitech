# Python Basic Tutorial - Content Guide

This guide explains how to add and manage content for the Python Basic tutorial book.

## Directory Structure

```
content/python-basic/
├── chapters/
│   ├── 00-preface-why.md
│   ├── 00-preface-who.md
│   ├── 01-intro-python.md
│   ├── 08-project-inventory.md
│   └── ... (other chapters)
│   └── id/                          # Indonesian translations
│       ├── 00-preface-why.md
│       ├── 00-preface-who.md
│       └── ...
```

## Adding a New Chapter

### Step 1: Create the Markdown File

Create a new `.md` file in `content/python-basic/chapters/` with the naming pattern:
- `NN-descriptive-slug.md` where `NN` is the chapter number

Example: `02-variables-datatypes.md`

### Step 2: Add Frontmatter

Every markdown file must start with YAML frontmatter:

```yaml
---
title: "Chapter Title"
slug: "chapter-slug"
chapterNumber: 2
part: 1
partTitle: "Part Title"
readingTime: 15
difficulty: "beginner"
objectives:
  - First learning objective
  - Second learning objective
  - Third learning objective
tags:
  - python
  - variables
  - data-types
locale: "en"
summary: "Short chapter summary for SEO and chapter listings"
---
```

### Step 3: Write Content with MDX

Write your content using standard Markdown with support for React components:

#### Standard Markdown

```markdown
## Section Title

Your text content here with **bold**, *italic*, and [links](url).

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Another item
```

#### Code Blocks

Use the `<CodeBlock>` component for syntax-highlighted code:

```markdown
<CodeBlock language="python" caption="Optional caption">
{`def hello():
    print("Hello, World!")`}
</CodeBlock>
```

**Important:** Wrap code in `{` and `}` with backticks for MDX.

#### Images

Use the `<ImageBlock>` component:

```markdown
<ImageBlock 
  src="/images/tutorial/python-basic/screenshot.png"
  alt="Description of image"
  caption="Optional caption text"
/>
```

#### Learning Objectives

Display learning objectives in a styled box:

```markdown
<LearningObjectives objectives={frontmatter.objectives} />
```

This automatically uses objectives from the frontmatter.

### Step 4: Update Structure Metadata

Edit `src/lib/tutorials/python-basic/structure.ts` to register the new chapter:

```typescript
{
  number: 1,
  title: {
    en: 'Foundations of Programming',
    id: 'Fondasi Pemrograman',
  },
  icon: '🧱',
  chapters: [
    { slug: 'intro-python', file: '01-intro-python.md', order: 5 },
    { slug: 'variables-datatypes', file: '02-variables-datatypes.md', order: 6 }, // Add here
    // ... other chapters
  ],
},
```

### Step 5: Add Indonesian Translation (Optional)

Create the same file in `content/python-basic/chapters/id/`:

```
content/python-basic/chapters/id/02-variables-datatypes.md
```

Use the same frontmatter structure but with Indonesian content and `locale: "id"`.

## Content Best Practices

### Writing Style

- **Conversational but professional** - Write like you're explaining to a friend
- **Short paragraphs** - 2-4 sentences max
- **Active voice** - "You will learn" not "It will be learned"
- **Clear headings** - Use H2 (##) and H3 (###) for structure
- **Real examples** - Show practical, realistic code

### Code Examples

- **Keep examples focused** - One concept at a time
- **Add comments** - Explain non-obvious code
- **Use realistic names** - `calculate_total()` not `foo()`
- **Show output** - Include expected results when helpful

### Learning Objectives

- **Action-oriented** - Start with verbs (Understand, Build, Apply)
- **Specific** - "Build a calculator" not "Learn Python"
- **Achievable** - 3-5 objectives per chapter

### Difficulty Levels

- **beginner** - No prior programming knowledge needed
- **intermediate** - Assumes understanding of previous chapters
- **advanced** - Complex concepts, multiple skills combined

### Reading Time

Estimate based on:
- ~200 words per minute
- Time to read code examples
- Time for exercises (if included)

Typical ranges:
- Preface: 3-5 minutes
- Introduction chapters: 10-15 minutes
- Technical chapters: 15-25 minutes
- Project chapters: 30-45 minutes

## Testing Your Content

### Local Development

```bash
cd frontend
npm run dev
```

Visit: `http://localhost:3000/en/tutorial/python-basic/your-chapter-slug`

### Build Test

```bash
npm run build
```

Ensure no errors and that your chapter generates static HTML.

## Common Patterns

### Section Structure

```markdown
## Main Topic

Introduction paragraph explaining the concept.

### Subtopic 1

Detailed explanation with examples.

<CodeBlock language="python">
{`# Example code here`}
</CodeBlock>

### Subtopic 2

More details...
```

### Exercises Section

```markdown
## Exercises

### Exercise 1: Title

Description of what to build.

**Expected output:**
```
Output example here
```

**Hints:**
- Hint 1
- Hint 2
```

### Reflection Section

```markdown
## Reflection

Before moving to the next chapter, consider:

- **Question 1** - Thought-provoking question
- **Question 2** - Another reflection prompt
- **Question 3** - Final reflection

Write your answers in a notebook or document.
```

## File Naming Conventions

- Use lowercase
- Use hyphens for spaces
- Be descriptive but concise
- Number prefix for ordering

Examples:
- ✅ `02-variables-datatypes.md`
- ✅ `08-project-calculator.md`
- ❌ `Variables.md`
- ❌ `chapter_2.md`

## Troubleshooting

### Chapter Not Appearing

1. Check frontmatter YAML is valid (proper indentation, quotes)
2. Verify slug matches in structure.ts
3. Check file name matches in structure.ts
4. Ensure file is in correct directory

### MDX Syntax Errors

1. Make sure code blocks use `{` and `}` with backticks
2. Close all component tags properly
3. Escape special characters in code
4. Check console for specific error messages

### Build Errors

1. Verify all frontmatter fields are present
2. Check TypeScript types match
3. Ensure all images referenced exist
4. Run `npm run build` to see specific errors

## Getting Help

For questions or issues:
1. Check existing chapters as examples
2. Review component documentation in `/components/tutorial/`
3. Test locally before committing
4. Ensure both English and Indonesian versions work

---

**Happy writing!** Your contributions help future developers learn Python and backend development. 🚀
