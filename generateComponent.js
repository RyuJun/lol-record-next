const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});




const makeDefault = `export { };
`;

const makeStyles = pages => `import React from 'react';
import styled from '@emotion/styled';

export const ${pages}Container = styled.div<React.CSSProperties>\`

\`;
`;

const makeComponent = pages => `import React from 'react';
import { ${pages}Container } from '@/components/${pages}/${pages}.styles';

const ${pages} = (): React.ReactElement => {
  return <${pages}Container></${pages}Container>;
};

export default ${pages};
`;

rl.question('컴포넌트 이름을 입력하세요. ', (inputArg) => {
  if (/^[a-zA-Z]*$/.test(inputArg)) {
    const input = inputArg.split('').map((t, i) => i === 0 ? t.toUpperCase() : t).join('');
    fs.mkdirSync(`src/components/${input}`);
    fs.writeFileSync(`src/components/${input}/${input}.types.tsx`, makeDefault);
    fs.writeFileSync(`src/components/${input}/${input}.hooks.tsx`, makeDefault);
    fs.writeFileSync(`src/components/${input}/${input}.constants.tsx`, makeDefault);
    fs.writeFileSync(`src/components/${input}/${input}.tsx`, makeComponent(input));
    fs.writeFileSync(`src/components/${input}/${input}.styles.tsx`, makeStyles(input));
    console.log(`${input} 컴포넌트 생성완료.`);
  } else {
    throw Error('영문 대소문자만 입력가능.');
  }
  process.exit();

});

