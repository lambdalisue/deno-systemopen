type Opener = (path: string) => [string, string[]];

let validOpener: Opener | undefined;

/**
 * Opens the given path with the system default application.
 */
export async function systemopen(path: string): Promise<boolean> {
  const openers = validOpener ? [validOpener] : openerCandidates[Deno.build.os];
  for (const opener of openers) {
    try {
      if (await openWith(opener, path)) {
        validOpener = opener;
        return true;
      }
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        continue;
      }
      throw error;
    }
  }
  return false;
}

async function openWith(opener: Opener, path: string): Promise<boolean> {
  const [cmd, args] = opener(path);
  const command = new Deno.Command(cmd, {
    args,
    stdin: "null",
    stdout: "null",
    stderr: "null",
  });
  const proc = command.spawn();
  const { success } = await proc.status;
  return success;
}

const openerCandidates: Record<string, Opener[]> = {
  linux: [
    (path: string) => ["xdg-open", [path]],
    (path: string) => ["wslview", [path]],
    (path: string) => ["gnome-open", [path]],
    (path: string) => ["kde-open", [path]],
    (path: string) => ["exo-open", [path]],
  ],
  darwin: [
    (path: string) => ["open", [path]],
  ],
  windows: [
    (path: string) => ["rundll32", ["url.dll,FileProtocolHandler", path]],
  ],
};
