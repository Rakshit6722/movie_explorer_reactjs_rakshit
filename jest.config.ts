export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      module: 'esnext',
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^slick-carousel/slick/slick\\.css$': '<rootDir>/__mocks__/styleMock.ts',
    '^slick-carousel/slick/slick-theme\\.css$': '<rootDir>/__mocks__/styleMock.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts',

  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
