import { JestConfigWithTsJest } from 'ts-jest';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
} satisfies JestConfigWithTsJest;
