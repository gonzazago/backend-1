import packageJson from '../package.json' with { type: 'json' };

export const { name, version, description, author, license } = packageJson;

export default packageJson;
