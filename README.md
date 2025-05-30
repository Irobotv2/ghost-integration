# Ghost Integration GitBook Automation

This tool automatically generates comprehensive documentation for the Ghost Integration platform in GitBook. It creates a well-structured set of pages covering everything from onboarding to advanced features.

## Setup Instructions

1. **Prerequisites**
   - Node.js installed on your system
   - A GitBook account with an existing space

2. **Installation**
   ```bash
   # Install dependencies
   npm install
   ```

3. **Configuration**
   
   You can configure your GitBook space in two ways:
   
   **Option 1: Use the setup helper (recommended)**
   ```bash
   npm run setup
   ```
   This interactive script will prompt you for your GitBook Space ID and configure the .env file automatically.
   
   **Option 2: Manual configuration**
   - Get your GitBook Space ID from your space URL: `https://app.gitbook.com/s/YOUR_SPACE_ID`
   - Update the `.env` file with your Space ID:
     ```
     GITBOOK_SPACE_ID=your-space-id-here
     ```

   **Need help finding your Space ID?** See the [GitBook Space ID Guide](./GITBOOK_SPACE_ID_GUIDE.md) for detailed instructions.

## Usage

Run the generator with:

```bash
npm run generate
```

The script will:
1. Validate your GitBook space access
2. Create 8 comprehensive documentation pages
3. Handle API rate limiting automatically
4. Provide real-time progress updates

## Documentation Structure

The generator creates the following pages:

1. **Welcome to Ghost Integration** - Introduction and key capabilities
2. **Getting Started** - Account creation and initial setup
3. **Core Workflows** - Primary transaction flows 
4. **Advanced Features** - Templates, recurring transactions, and API access
5. **Platform-Specific Guides** - Venmo, Kraken, and Coinbase integrations
6. **Use Case Examples** - Real-world applications
7. **Troubleshooting and Support** - Common issues and solutions
8. **Security Best Practices** - Account and transaction security

## Customization

To modify the content of any page, edit the `documentationStructure` array in `ghost-integration-gitbook-generator.js`.

## API Token

The script uses a pre-configured API token. If you need to use your own token:

1. Generate a new token in GitBook (Space Settings → Advanced → API)
2. Replace the `API_TOKEN` value in the script

## Error Handling

If any page creation fails, the script will:
- Display detailed error information
- Continue with remaining pages
- Provide a summary of successful and failed operations

## Additional Resources

- [GitBook API Documentation](https://developer.gitbook.com/)
- [Markdown Syntax Guide](https://www.markdownguide.org/basic-syntax/)
