import fs from 'fs';
import readline from 'readline';

const transcriptPath = 'C:/Users/victo/.gemini/antigravity/brain/e072d2ee-c14f-4f92-ba44-c052cfa7214d/.system_generated/logs/transcript.jsonl';

async function scan() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          if (tc.name === 'write_to_file' || tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') {
            const args = tc.args;
            if (args && args.TargetFile && args.TargetFile.endsWith('main.js')) {
              console.log(`Step ${step.step_index} (${step.type}): ${tc.name} on main.js, CodeContent len: ${args.CodeContent ? args.CodeContent.length : 0}, ReplacementChunks: ${args.ReplacementChunks ? args.ReplacementChunks.length : 0}`);
            }
          }
        }
      }
      if (step.type === 'VIEW_FILE' && step.content && step.content.includes('main.js')) {
        console.log(`Step ${step.step_index}: VIEW_FILE main.js, len: ${step.content.length}`);
      }
    } catch (e) {
    }
  }
}

scan();
