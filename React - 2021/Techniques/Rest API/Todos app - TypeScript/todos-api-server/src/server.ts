import ExpressServer from './express/app';

const initAPIServer = async () => {
  const isListening = await ExpressServer.start();

  if (isListening) {
    console.log('Listening...');
  } else {
    console.log('NOT Listening!');
  }
};

void initAPIServer();

interface Add {
  (num1: number): number;
  (num1: number, num2: number): number;
}

const add: Add = (num1: number, num2?: number) => {
  console.log('Adding...');
  console.log(num1);
  console.log(num2);
  return num1 + num1;
};

console.log(add(5));
console.log(add(5, 10));
