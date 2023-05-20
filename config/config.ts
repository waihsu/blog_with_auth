interface Config {
  GITHUB_ID: string | undefined;
  GITHUB_SECRET: string | undefined;
}

export const config: Config = {
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
};
