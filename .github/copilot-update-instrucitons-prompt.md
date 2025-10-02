# Prompt to Update Copilot Instructions

**Instructions for AI Agent:**

You are tasked with updating the `.github/copilot-instructions.md` file to reflect recent changes in the project's structure or functionality. Follow these steps carefully:

1.  **Analyze Recent Changes:** Review the current state of the codebase, paying close attention to:
    *   New files or directories.
    *   Modified files, especially in `src/controllers/`, `src/services/`, `src/repositories/`, `src/routes/`, and `public/scripts/`.
    *   Changes in data flow or component interactions.
    *   Updates to `package.json` (new dependencies) or `tsconfig.json`.
    *   Any new or modified critical developer workflows (e.g., build commands, test scripts).

2.  **Refer to Existing Instructions:** Read the current content of `.github/copilot-instructions.md`.

3.  **Identify Discrepancies:** Compare your analysis of the recent changes with the existing instructions. Pinpoint any sections that are:
    *   Outdated or incorrect.
    *   Missing new information.
    *   Could be improved for clarity or completeness based on new patterns.

4.  **Generate Updated Content:** Create a revised version of the `.github/copilot-instructions.md` file.
    *   **Merge Intelligently:** Preserve valuable existing content.
    *   **Add New Information:** Incorporate details about new features, components, or workflows.
    *   **Update Outdated Sections:** Correct any information that is no longer accurate.
    *   **Maintain Structure:** Keep the existing Markdown heading structure (e.g., "1. Project Architecture Overview", "2. Data Flow Example", etc.) unless a significant architectural shift warrants a change.
    *   **Concise and Actionable:** Ensure instructions are concise, actionable, and include specific examples from the codebase where appropriate.
    *   **Avoid Generic Advice:** Focus on project-specific approaches.
    *   **Document Discoverable Patterns:** Only document what is currently implemented, not aspirational practices.

5.  **Use `insert_edit_into_file`:** Apply the generated updated content to the `.github/copilot-instructions.md` file using the `insert_edit_into_file` tool. Provide a clear explanation for the edit.

**User Action:**

To trigger this update, the user will explicitly run this prompt.